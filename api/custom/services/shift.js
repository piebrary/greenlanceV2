module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, ShiftModel, notFoundHandler, successHandler, errorHandler, shiftRequestDto, shiftResponseDto, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { ShiftModel = require('../../custom/models/shift') } catch { ShiftModel = require('../../default/models/shift') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { shiftRequestDto = require('../../custom/dto/request/shift/shift/') } catch { shiftRequestDto = require('../../default/dto/request/shift/shift') }
    try { shiftResponseDto = require('../../custom/dto/response/shift/shift') } catch { shiftResponseDto = require('../../default/dto/response/shift/shift') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }

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
        reportOnDuty,
        checkout,
    }

    async function getShifts(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer'){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const shiftDocuments = await ShiftModel.find({ business:currentFreelancerDoc.businesses })

                const shiftDocumentsDto = shiftDocuments.map(t => shiftAsFreelancerResponseDto(t))

                return successHandler(undefined, shiftDocumentsDto)

            }

            if(currentUserDoc.roles.includes('business'){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const shiftDocuments = await ShiftModel.find({ business:currentBusinessDoc._id })

                const shiftDocumentsDto = shiftDocuments.map(t => shiftAsBusinessResponseDto(t))

                return successHandler(undefined, shiftDocumentsDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getShiftById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer'){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const shiftDocument = await ShiftModel.findOne({ _id:req.params._id, business:currentFreelancerDoc.businesses })

                const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument)

                return successHandler(undefined, shiftDocumentDto)

            }

            if(currentUserDoc.roles.includes('business'){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const shiftDocument = await ShiftModel.find({ _id:req.params._id, business:currentBusinessDoc._id })

                const shiftDocumentDto = shiftAsBusinessResponseDto(shiftDocument))

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

            const {
                title,
                description,
                business,
                payment,
                label,
                datetime,
                location,
                recurring,
                active
            } = shiftRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const newShiftDoc = new ShiftModel({
                    title,
                    description,
                    business,
                    payment,
                    label,
                    datetime,
                    location,
                    recurring,
                    active,
                    creator:currentUserDoc._id
                })

                const newMutationDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'create',
                    data:{
                        title,
                        description,
                        business,
                        payment,
                        label,
                        datetime,
                        location,
                        recurring,
                        active,
                    }
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

        // only for employer

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc.roles.includes('employer')) return errorHandler(403, 'Forbidden')

            const {
                title,
                description,
                payment,
                label,
                datetime,
                location,
                recurring,
                active
            } = shiftRequestDto(req.body)

            const shiftDoc = await ShiftModel.findOne({ _id:req.params._id })


            if(!shiftDoc){

                return notFoundHandler('Shift')

            }

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(title) shiftDoc.title = title
                if(description) shiftDoc.description = description
                if(payment) shiftDoc.payment = payment
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
                        payment,
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

        // only for employer

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

            const shiftDocument = await ShiftModel.findOne({
                business:currentFreelancerDoc.businesses,
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

            const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDocument)

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

            const shiftDocumentDto = shiftAsFreelancerResponseDto(shiftDOcument)

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

            const freelancerDoc = await FreelancerModel.findOne({ _id:req.params.freelancerId })
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                business:currentBusinessDoc._id,
                _id:req.params.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(!shiftDocument.applied.includes(req.params.freelancerId)) return errorHandler(409, 'Freelancer hat not applied')
            if(shiftDocument.enrolled.includes(req.params.freelancerId)) return errorHandler(409, 'Freelancer is already enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const shiftDocAppliedIndex = shiftDoc.applied.indexOf(freelancerDoc._id)
                if(shiftDocAppliedIndex > -1) shiftDoc.applied.splice(shiftDocAppliedIndex, 1)

                shiftDocument.enrolled.push(req.params.freelancerId)

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

            const freelancerDoc = await FreelancerModel.findOne({ _id:req.params.freelancerId })
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const shiftDocument = await ShiftModel.findOne({
                business:currentBusinessDoc._id,
                _id:req.params.shiftId
            })

            if(!shiftDocument) return notFoundHandler('Shift')
            if(!shiftDocument.applied.includes(req.params.freelancerId)) return errorHandler(409, 'Freelancer has not applied')
            if(!shiftDocument.enrolled.includes(req.params.freelancerId)) return errorHandler(409, 'Freelancer is not enrolled')

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const shiftDocAppliedIndex = shiftDoc.applied.indexOf(freelancerDoc._id)
                if(shiftDocAppliedIndex > -1){

                     shiftDoc.applied.splice(shiftDocAppliedIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:currentUserDoc._id,
                        action:'decline'
                    })

                    shiftDocument.mutations.push(newMutationShiftDoc._id)
                    await shiftDocument.save()
                    await newMutationShiftDoc.save()

                }

                const shiftDocEnrolledIndex = shiftDoc.enrolled.indexOf(freelancerDoc._id)
                if(shiftDocEnrolledIndex > -1){

                     shiftDoc.enrolled.splice(shiftDocEnrolledIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:currentUserDoc._id,
                        action:'decline'
                    })

                    shiftDocument.mutations.push(newMutationShiftDoc._id)
                    await shiftDocument.save()
                    await newMutationShiftDoc.save()

                }

                const freelancerDocAppliedIndex = freelancerDoc.applied.indexOf(shiftDoc._id)
                if(freelancerDocAppliedIndex > -1){

                     freelancerDoc.applied.splice(freelancerDocAppliedIndex, 1)

                    const newMutationShiftDoc = new MutationModel({
                        user:currentUserDoc._id,
                        action:'decline'
                    })

                    freelancerDocument.mutations.push(newMutationFreelancerDoc._id)
                    await freelancerDocument.save()
                    await newMutationFreelancerDoc.save()

                }

                const freelancerDocEnrolledIndex = freelancerDoc.enrolled.indexOf(shiftDoc._id)
                if(freelancerDocEnrolledIndex > -1){

                     freelancerDoc.enrolled.splice(freelancerDocEnrolledIndex, 1)

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


    reportOnDuty,
    checkout,

}
