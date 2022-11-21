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
        checkInById,
        checkOutById,
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

                const shiftDocuments = await ShiftModel.find()
                // use below line when enabling connected freelancers and businesses
                // const shiftDocuments = await ShiftModel.find({ business:currentFreelancerDoc.businesses })

                const shiftDocumentsDto = shiftAsFreelancerResponseDto(shiftDocuments, currentFreelancerDoc._id)

                return successHandler(undefined, shiftDocumentsDto)

            }

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const shiftDocuments = await ShiftModel
                    .find({ business:currentBusinessDoc._id })

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
                        populate: {
                            path: 'business',
                            model: 'Business',
                            select: 'name'
                        }
                    })

                const enrolledDocsDto = shiftAsFreelancerResponseDto(enrolledDocs.enrolled, currentFreelancerDoc._id)

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

                const shiftDocumentsDto = shiftAsFreelancerResponseDto(shiftDocuments, currentFreelancerDoc._id)

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

                const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument, currentFreelancerDoc._id)

                return successHandler(undefined, shiftDocumentDto)

            }

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const shiftDocument = await ShiftModel
                    .findOne({ _id:req.params._id, business:currentBusinessDoc._id })
                    .populate('applied enrolled withdrawn checkIn checkOut')

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
            if(shiftDocument.applied.includes(currentFreelancerDoc._id)) return errorHandler(409, 'Freelancer is already applied')
            if(shiftDocument.enrolled.includes(currentFreelancerDoc._id)) return errorHandler(409, 'Freelancer is already enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                shiftDocument.applied.push(currentFreelancerDoc._id)

                const newMutationShiftDoc = new MutationModel({
                    user:currentFreelancerDoc._id,
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

            const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument, currentFreelancerDoc._id)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function withdrawById(req){

        try {

            const currentFreelancerDoc = await getCurrentFreelancer(req)
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                business:currentFreelancerDoc.businesses,
                _id:req.params._id
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(!shiftDocument.applied.includes(currentFreelancerDoc._id)) return errorHandler(409, 'Freelancer has not applied')
            if(!shiftDocument.enrolled.includes(currentFreelancerDoc._id)) return errorHandler(409, 'Freelancer has not enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const shiftDocAppliedIndex = shiftDocument.applied.indexOf(currentFreelancerDoc._id)
                if(shiftDocAppliedIndex > -1){

                    shiftDocument.applied.splice(shiftDocAppliedIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:currentFreelancerDoc._id,
                        action:'withdraw'
                    })

                    shiftDocument.mutations.push(newMutationShiftDoc._id)
                    await shiftDocument.save()
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

            })

            session.endSession()

            const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument, currentFreelancerDoc._id)

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

            const freelancerDoc = await FreelancerModel.findOne({ _id:req.query.freelancerId })
            if(!freelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                // business:currentBusinessDoc._id,
                _id:req.query.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(!shiftDocument.applied.includes(req.query.freelancerId)) return errorHandler(409, 'Freelancer hat not applied')
            if(shiftDocument.enrolled.includes(req.query.freelancerId)) return errorHandler(409, 'Freelancer is already enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const shiftDocAppliedIndex = shiftDocument.applied.indexOf(freelancerDoc._id)
                if(shiftDocAppliedIndex > -1) shiftDocument.applied.splice(shiftDocAppliedIndex, 1)

                shiftDocument.enrolled.push(req.query.freelancerId)

                const newMutationShiftDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'accept'
                })

                shiftDocument.mutations.push(newMutationShiftDoc._id)
                await shiftDocument.save()
                await newMutationShiftDoc.save()

                const freelancerDocAppliedIndex = freelancerDoc.applied.indexOf(shiftDocument._id)
                if(freelancerDocAppliedIndex > -1) freelancerDoc.applied.splice(freelancerDocAppliedIndex, 1)

                freelancerDoc.enrolled.push(shiftDocument._id)

                const newMutationFreelancerDoc = new MutationModel({
                    user:shiftDocument._id,
                    action:'accept'
                })

                freelancerDoc.mutations.push(newMutationFreelancerDoc._id)
                await freelancerDoc.save()
                await newMutationFreelancerDoc.save()

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

            const freelancerDocument = await FreelancerModel.findOne({ _id:req.query.freelancerId })
            if(!freelancerDocument) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                // business:currentBusinessDoc._id,
                _id:req.query.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(
                !shiftDocument.applied.includes(req.query.freelancerId)
                && !shiftDocument.enrolled.includes(req.query.freelancerId)
            ) return errorHandler(409, 'Freelancer has not applied or is not enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const shiftDocAppliedIndex = shiftDocument.applied.indexOf(freelancerDocument._id)
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

                const shiftDocEnrolledIndex = shiftDocument.enrolled.indexOf(freelancerDocument._id)
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

            })

            session.endSession()

            const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function checkInById(req){

        try {

            const freelancerDoc = await FreelancerModel.findOne({ user:req.user._id })
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                _id:req.query.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(!shiftDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')

            const checkInTime = req.query.datetime || new Date()

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                shiftDoc.checkIn.push({
                    _id:freelancerDoc._id,
                    datetime:checkInTime
                })

                const newMutationShiftDoc = new MutationModel({
                    user:req.user._id,
                    action:'reportCheckIn',
                    datetime:checkInTime
                })

                shiftDocument.mutations.push(newMutationShiftDoc._id)
                await shiftDocument.save()
                await newMutationShiftDoc.save()

            })

            session.endSession()

            const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function checkOutById(req){

        try {

            const freelancerDoc = await FreelancerModel.findOne({ user:req.user._id })
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                _id:req.query.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(!shiftDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')

            const checkOutTime = req.query.datetime || new Date()

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                shiftDoc.checkIn.push({
                    _id:freelancerDoc._id,
                    time:checkOutTime
                })

                const newMutationShiftDoc = new MutationModel({
                    user:req.user._id,
                    action:'reportCheckOut',
                    time:checkOutTime
                })

                shiftDocument.mutations.push(newMutationShiftDoc._id)
                await shiftDocument.save()
                await newMutationShiftDoc.save()

            })

            session.endSession()

            const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument)

            return successHandler(undefined, shiftDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
