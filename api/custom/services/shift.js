const moment = require('moment')

module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, notFoundHandler, successHandler, errorHandler, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }

    const shiftAsBusinessRequestDto = require('../../custom/dto/request/shift/shiftAsBusiness')
    const shiftAsFreelancerResponseDto = require('../../custom/dto/response/shift/shiftAsFreelancer')
    const shiftAsBusinessResponseDto = require('../../custom/dto/response/shift/shiftAsBusiness')
    const ShiftModel = require('../../custom/models/shift')
    const BusinessModel = require('../../custom/models/business')
    const FreelancerModel = require('../../custom/models/freelancer')
    const TimesheetModel = require('../../custom/models/timesheet')
    const getCurrentBusiness = require('../../custom/utils/getCurrentBusiness')
    const getCurrentFreelancer = require('../../custom/utils/getCurrentFreelancer')

    return {
        getShifts,
        getShiftById,
        createShift,
        updateShiftById,
        deleteShiftById,
        applyById,
        withdrawById,
        acceptById,
        declineById,
        // checkInById,
        // checkOutById,
        getApprovedShiftsForToday,
        getEnrolledShifts,
    }

    async function getShifts(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const shiftDocuments = await ShiftModel
                    .find()
                // use below line when enabling connected freelancers and businesses
                // const shiftDocuments = await ShiftModel.find({ business:currentFreelancerDoc.businesses })

                const shiftDocumentsDto = shiftAsFreelancerResponseDto(shiftDocuments, req.user._id)

                return successHandler(undefined, shiftDocumentsDto)

            }

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const shiftDocuments = await ShiftModel
                    .find({ business:currentBusinessDoc._id })
                    // .populate('applied enrolled withdrawn declined')
                    .populate([
                        {
                            path:'applied',
                            model: 'User',
                        },
                        {
                            path:'enrolled',
                            model: 'User',
                        },
                        {
                            path:'withdrawn',
                            model: 'User',
                        },
                        {
                            path:'declined',
                            model: 'User',
                        },
                        {
                            path:'timesheets',
                            model: 'Timesheet',
                            populate: {
                                path:'freelancer',
                                model:'Freelancer',
                                select:'name'
                            }
                        }
                    ])

                const shiftDocumentsDto = shiftAsBusinessResponseDto(shiftDocuments)

                return successHandler(undefined, shiftDocumentsDto)

            }

            return errorHandler(403, 'Forbidden')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getEnrolledShifts(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)
            const currentFreelancerDoc = await getCurrentFreelancer(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const enrolledDocs = await FreelancerModel
                    .findOne({ user:req.user._id })
                    .select('enrolled')
                    // .populate('enrolled', 'datetime enrolled timesheets business')
                    .populate({
                        path:'enrolled',
                        model: 'Shift',
                        select: 'datetime enrolled timesheets business',
                        populate: [{
                            path: 'business',
                            model: 'Business',
                            select: 'name'
                        },{
                            path: 'timesheets',
                            model: 'Timesheet',
                            select: 'shift freelancer planned actualByBusiness actualByFreelancer accepted disputed status'
                        }]
                    })

                const enrolledDocsDto = shiftAsFreelancerResponseDto(enrolledDocs.enrolled, req.user._id)

                return successHandler(undefined, enrolledDocsDto)

            }

            return errorHandler(403, 'Forbidden')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getApprovedShiftsForToday(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const shiftDocuments = await ShiftModel.find({
                    datetime: {
                        start: {
                            $gte:moment().startOf('day').toDate(),
                            $lte:moment().endOf('day').toDate()
                        }
                    }
                })
                // use below line when enabling connected freelancers and businesses
                // const shiftDocuments = await ShiftModel.find({ business:currentFreelancerDoc.businesses })

                const shiftDocumentsDto = shiftAsFreelancerResponseDto(shiftDocuments, req.user._id)

                return successHandler(undefined, shiftDocumentsDto)

            }

            // if(currentUserDoc.roles.includes('business')){
            //
            //     const currentBusinessDoc = await getCurrentBusiness(req)
            //
            //     const shiftDocuments = await ShiftModel
            //         .find({ business:currentBusinessDoc._id })
            //
            //     const shiftDocumentsDto = shiftAsBusinessResponseDto(shiftDocuments)
            //
            //     return successHandler(undefined, shiftDocumentsDto)
            //
            // }

            return errorHandler(403, 'Forbidden')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getShiftById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const shiftDocument = await ShiftModel.findOne({ _id:req.params._id, business:currentFreelancerDoc.businesses })

                const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument, req.user._id)

                return successHandler(undefined, shiftDocumentDto)

            }

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const shiftDocument = await ShiftModel
                    .findOne({ _id:req.params._id, business:currentBusinessDoc._id })
                    .populate('applied enrolled withdrawn')

                const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)

                return successHandler(undefined, shiftDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createShift(req){

        try {

            const currentUserDoc = await getCurrentUser(req)
            const currentBusinessDoc = await getCurrentBusiness(req)

            if(!currentBusinessDoc) return errorHandler(403, 'Forbidden')

            const shiftDto = shiftAsBusinessRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                shiftDto.business = currentBusinessDoc._id
                shiftDto.creator = currentUserDoc._id

                const newShiftDoc = new ShiftModel(shiftDto)

                const newMutationDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'create',
                    data:shiftDto
                })

                newShiftDoc.mutations.push(newMutationDoc._id)

                response = await newShiftDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const newShiftDocDto = shiftAsBusinessResponseDto(response)

            return successHandler(undefined, newShiftDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateShiftById(req){

        // only for business

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc.roles.includes('business')) return errorHandler(403, 'Forbidden')

            const {
                name,
                description,
                price,
                spots,
                label,
                datetime,
                location,
                recurring,
                active
            } = shiftAsBusinessRequestDto(req.body)

            const shiftDoc = await ShiftModel.findOne({ _id:req.params._id })


            if(!shiftDoc){

                return notFoundHandler('Shift')

            }

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(name) shiftDoc.name = name
                if(description) shiftDoc.description = description
                if(price) shiftDoc.price = price
                if(spots) shiftDoc.spots = spots
                if(label) shiftDoc.label = label
                if(datetime) shiftDoc.datetime = datetime
                if(location) shiftDoc.location = location
                if(recurring) shiftDoc.recurring = recurring
                if(active) shiftDoc.active = active

                const newMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'update',
                    data:{
                        name,
                        description,
                        price,
                        spots,
                        label,
                        datetime,
                        location,
                        recurring,
                        active
                    }
                })

                response = await shiftDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const shiftDocDto = shiftAsBusinessResponseDto(response)

            return successHandler(undefined, shiftDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function deleteShiftById(req){

        // only for business

        try {

            const currentBusinessDoc = await getCurrentBusiness(req)

            if(!currentBusinessDoc) return errorHandler(403, 'Forbidden')

            const shiftDocument = await ShiftModel.findOneAndDelete({ _id:req.params._id })

            if(!shiftDocument) return notFoundHandler('Shift')

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function applyById(req){

        try {

            const currentFreelancerDoc = await getCurrentFreelancer(req)
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            // uncomment when  users need to be connected to a business
            const shiftDocument = await ShiftModel.findOne({
                // business:currentFreelancerDoc.businesses,
                _id:req.params._id
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(shiftDocument.applied.includes(req.user._id)) return errorHandler(409, 'Freelancer is already applied')
            if(shiftDocument.enrolled.includes(req.user._id)) return errorHandler(409, 'Freelancer is already enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                shiftDocument.applied.push(req.user._id)

                const newMutationShiftDoc = new MutationModel({
                    user:req.user._id,
                    action:'apply'
                })

                shiftDocument.mutations.push(newMutationShiftDoc._id)
                await shiftDocument.save()
                await newMutationShiftDoc.save()

                currentFreelancerDoc.applied.push(shiftDocument._id)

                const newMutationFreelancerDoc = new MutationModel({
                    user:shiftDocument._id,
                    action:'apply'
                })

                currentFreelancerDoc.mutations.push(newMutationFreelancerDoc._id)
                await currentFreelancerDoc.save()
                await newMutationFreelancerDoc.save()

            })

            session.endSession()

            const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument, req.user._id)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function withdrawById(req){

        try {

            const currentFreelancerDoc = await getCurrentFreelancer(req)
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel
                .findOne({
                    // business:currentFreelancerDoc.businesses,
                    _id:req.params._id
                })
                .populate('timesheets')

            // const timesheetDocument = await TimesheetModel.findOne({
            //     // business:currentFreelancerDoc.businesses,
            //     shift:req.params._id
            // })
            //
            // if(!timesheetDocument) return notFoundHandler('Timesheet')
            if(!shiftDocument) return notFoundHandler('Shift')

            if(
                !shiftDocument.applied.includes(req.user._id)
                && !shiftDocument.enrolled.includes(req.user._id)
            ) return errorHandler(409, 'Freelancer has not applied or is enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                // const shiftDocTimesheetIndex = shiftDocument.timesheets.indexOf(timesheetDocument._id)
                // if(shiftDocTimesheetIndex > -1){
                //
                //     shiftDocument.timesheets.splice(shiftDocTimesheetIndex, 1)
                //
                //     const newMutationTimesheetDoc = new MutationModel({
                //         user:req.user._id,
                //         action:'withdraw'
                //     })
                //
                //     timesheetDocument.mutations.push(newMutationTimesheetDoc._id)
                //
                // }

                shiftDocument.withdrawn.push(req.user._id)

                shiftDocument.timesheets = shiftDocument.timesheets.filter(timesheet => !timesheet.freelancer.equals(req.user._id))

                const shiftDocAppliedIndex = shiftDocument.applied.indexOf(req.user._id)
                if(shiftDocAppliedIndex > -1){

                    shiftDocument.applied.splice(shiftDocAppliedIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:req.user._id,
                        action:'withdraw'
                    })

                    shiftDocument.mutations.push(newMutationShiftDoc._id)

                    await newMutationShiftDoc.save()

                }

                const shiftDocEnrolledIndex = shiftDocument.enrolled.indexOf(req.user._id)
                if(shiftDocEnrolledIndex > -1){

                    shiftDocument.enrolled.splice(shiftDocEnrolledIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:req.user._id,
                        action:'withdraw'
                    })

                    shiftDocument.mutations.push(newMutationShiftDoc._id)

                    await newMutationShiftDoc.save()

                }

                const freelancerDocAppliedIndex = currentFreelancerDoc.applied.indexOf(shiftDocument._id)
                if(freelancerDocAppliedIndex > -1){

                    currentFreelancerDoc.applied.splice(freelancerDocAppliedIndex, 1)

                    const newMutationFreelancerDoc = new MutationModel({
                        user:shiftDocument._id,
                        action:'withdraw'
                    })

                    currentFreelancerDoc.mutations.push(newMutationFreelancerDoc._id)

                    await currentFreelancerDoc.save()
                    await newMutationFreelancerDoc.save()

                }

                await shiftDocument.save()
                await shiftDocument.populate('timesheets')

            })

            session.endSession()

            const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument, req.user._id)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function acceptById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)
            if(!currentUserDoc) return notFoundHandler('User')

            const currentBusinessDoc = await getCurrentBusiness(req)
            if(!currentBusinessDoc) return notFoundHandler('Business')

            const freelancerDoc = await FreelancerModel.findOne({ users:req.query.userId })
            if(!freelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                business:currentBusinessDoc._id,
                _id:req.query.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(!shiftDocument.applied.includes(req.query.userId)) return errorHandler(409, 'Freelancer has not applied')
            if(shiftDocument.enrolled.includes(req.query.userId)) return errorHandler(409, 'Freelancer is already enrolled')
            if(shiftDocument.positions <= shiftDocument.enrolled.length) return errorHandler(409, 'No open spots available')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const shiftDocAppliedIndex = shiftDocument.applied.indexOf(req.query.userId)
                if(shiftDocAppliedIndex > -1) shiftDocument.applied.splice(shiftDocAppliedIndex, 1)

                const newTimesheetDoc = new TimesheetModel({
                    shift:shiftDocument._id,
                    freelancer:req.query.userId,
                    business:currentBusinessDoc._id,
                    planned:shiftDocument.datetime,
                })

                const newMutationTimesheetDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'create timesheet',
                    data:{
                        shift:shiftDocument._id,
                        freelancer:req.query.userId,
                        planned:shiftDocument.datetime,
                        business:currentBusinessDoc._id,
                    }
                })

                newTimesheetDoc.mutations.push(newMutationTimesheetDoc._id)

                shiftDocument.timesheets.push(newTimesheetDoc._id)
                shiftDocument.enrolled.push(req.query.userId)

                const newMutationShiftDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'accept freelancer for shift',
                    data:{
                        shift:shiftDocument._id,
                        freelancer:req.query.userId,
                    }
                })

                shiftDocument.mutations.push(newMutationShiftDoc._id)

                const freelancerDocAppliedIndex = freelancerDoc.applied.indexOf(shiftDocument._id)
                if(freelancerDocAppliedIndex > -1) freelancerDoc.applied.splice(freelancerDocAppliedIndex, 1)

                freelancerDoc.enrolled.push(shiftDocument._id)

                freelancerDoc.mutations.push(newMutationShiftDoc._id)

                await shiftDocument.save()
                await newMutationTimesheetDoc.save()
                await newMutationShiftDoc.save()
                await freelancerDoc.save()
                await newTimesheetDoc.save()

            })

            session.endSession()

            const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function declineById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)
            if(!currentUserDoc) return notFoundHandler('User')

            const currentBusinessDoc = await getCurrentBusiness(req)
            if(!currentBusinessDoc) return notFoundHandler('Business')

            const freelancerDocument = await FreelancerModel.findOne({ users:req.query.userId })
            if(!freelancerDocument) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                // business:currentBusinessDoc._id,
                _id:req.query.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(
                !shiftDocument.applied.includes(req.query.userId)
                && !shiftDocument.enrolled.includes(req.query.userId)
            ) return errorHandler(409, 'Freelancer has not applied or is not enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                shiftDocument.declined.push(currentUserDoc._id)

                const shiftDocAppliedIndex = shiftDocument.applied.indexOf(req.query.userId)
                if(shiftDocAppliedIndex > -1){

                     shiftDocument.applied.splice(shiftDocAppliedIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:currentUserDoc._id,
                        action:'decline'
                    })

                    shiftDocument.mutations.push(newMutationShiftDoc._id)
                    await shiftDocument.save()
                    await newMutationShiftDoc.save()

                }

                const shiftDocEnrolledIndex = shiftDocument.enrolled.indexOf(req.query.userId)
                if(shiftDocEnrolledIndex > -1){

                     shiftDocument.enrolled.splice(shiftDocEnrolledIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:currentUserDoc._id,
                        action:'decline'
                    })

                    shiftDocument.mutations.push(newMutationShiftDoc._id)
                    await shiftDocument.save()
                    await newMutationShiftDoc.save()

                }

                const freelancerDocAppliedIndex = freelancerDocument.applied.indexOf(shiftDocument._id)
                if(freelancerDocAppliedIndex > -1){

                     freelancerDocument.applied.splice(freelancerDocAppliedIndex, 1)

                    const newMutationFreelancerDoc = new MutationModel({
                        user:currentUserDoc._id,
                        action:'decline'
                    })

                    freelancerDocument.mutations.push(newMutationFreelancerDoc._id)
                    await freelancerDocument.save()
                    await newMutationFreelancerDoc.save()

                }

                const freelancerDocEnrolledIndex = freelancerDocument.enrolled.indexOf(shiftDocument._id)
                if(freelancerDocEnrolledIndex > -1){

                     freelancerDocument.enrolled.splice(freelancerDocEnrolledIndex, 1)

                    const newMutationFreelancerDoc = new MutationModel({
                        user:currentUserDoc._id,
                        action:'decline'
                    })

                    freelancerDocument.mutations.push(newMutationFreelancerDoc._id)
                    await freelancerDocument.save()
                    await newMutationFreelancerDoc.save()

                }

                const timesheetDocument = await FreelancerModel.deleteOne({ _id:req.query.shiftId })

            })

            session.endSession()

            const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    // async function checkInById(req){
    //
    //     try {
    //
    //         const freelancerDoc = await FreelancerModel.findOne({ user:req.user._id })
    //         if(!currentFreelancerDoc) return notFoundHandler('Freelancer')
    //
    //         const shiftDocument = await ShiftModel.findOne({
    //             _id:req.query.shiftId
    //         })
    //
    //         if(!shiftDocument) return notFoundHandler('Shift')
    //         if(!shiftDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')
    //
    //         const checkInTime = req.query.datetime || new Date()
    //
    //         const session = await connection.startSession()
    //         await session.withTransaction(async () => {
    //
    //             shiftDoc.checkIn.push({
    //                 _id:freelancerDoc._id,
    //                 datetime:checkInTime
    //             })
    //
    //             const newMutationShiftDoc = new MutationModel({
    //                 user:req.user._id,
    //                 action:'reportCheckIn',
    //                 datetime:checkInTime
    //             })
    //
    //             shiftDocument.mutations.push(newMutationShiftDoc._id)
    //             await shiftDocument.save()
    //             await newMutationShiftDoc.save()
    //
    //         })
    //
    //         session.endSession()
    //
    //         const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)
    //
    //         return successHandler(undefined, shiftDocumentDto)
    //
    //     } catch (error) {
    //
    //         return errorHandler(undefined, error)
    //
    //     }
    //
    // }
    //
    // async function checkOutById(req){
    //
    //     try {
    //
    //         const freelancerDoc = await FreelancerModel.findOne({ user:req.user._id })
    //         if(!currentFreelancerDoc) return notFoundHandler('Freelancer')
    //
    //         const shiftDocument = await ShiftModel.findOne({
    //             _id:req.query.shiftId
    //         })
    //
    //         if(!shiftDocument) return notFoundHandler('Shift')
    //         if(!shiftDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')
    //
    //         const checkOutTime = req.query.datetime || new Date()
    //
    //         const session = await connection.startSession()
    //         await session.withTransaction(async () => {
    //
    //             shiftDoc.checkIn.push({
    //                 _id:freelancerDoc._id,
    //                 time:checkOutTime
    //             })
    //
    //             const newMutationShiftDoc = new MutationModel({
    //                 user:req.user._id,
    //                 action:'reportCheckOut',
    //                 time:checkOutTime
    //             })
    //
    //             shiftDocument.mutations.push(newMutationShiftDoc._id)
    //             await shiftDocument.save()
    //             await newMutationShiftDoc.save()
    //
    //         })
    //
    //         session.endSession()
    //
    //         const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)
    //
    //         return successHandler(undefined, shiftDocumentDto)
    //
    //     } catch (error) {
    //
    //         return errorHandler(undefined, error)
    //
    //     }
    //
    // }

}
