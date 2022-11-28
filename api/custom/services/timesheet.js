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

    const timesheetAsAllRequestDto = require('../../custom/dto/request/timesheet/timesheetAsAll')
    const timesheetAsAllResponseDto = require('../../custom/dto/response/timesheet/timesheetAsAll')
    const ShiftModel = require('../../custom/models/shift')
    const FreelancerModel = require('../../custom/models/freelancer')
    const TimesheetModel = require('../../custom/models/timesheet')
    const getCurrentBusiness = require('../../custom/utils/getCurrentBusiness')
    const getCurrentFreelancer = require('../../custom/utils/getCurrentFreelancer')

    return {
        getTimesheets,
        getTimesheetById,
        updateTimesheetActual,
        disputeTimesheetActual,
    }

    async function getTimesheets(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const freelancerDocument = await FreelancerModel
                    .findOne({ user:req.user._id })
                    .populate('enrolled')

                const timesheets = freelancerDocument.enrolled
                    .map(enrolled => enrolled.timesheets)
                    .filter(timesheets => timesheets.freelancerId)

                const timesheetDocumentsDto = timesheetAsAllResponseDto(timesheets)

                return successHandler(undefined, timesheets)

            }

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const timesheetDocuments = await TimesheetModel
                    .find({ business:currentBusinessDoc._id })

                const timesheetDocumentsDto = timesheetAsBusinessResponseDto(timesheetDocuments)

                return successHandler(undefined, timesheetDocumentsDto)

            }

            return errorHandler(403, 'Forbidden')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getTimesheetById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const currentFreelancerDoc = await getCurrentFreelancer(req)

                const timesheetDocument = await TimesheetModel.findOne({ _id:req.params._id, business:currentFreelancerDoc.businesses })

                const timesheetDocumentDto = timesheetAsFreelancerResponseDto(timesheetDocument)

                return successHandler(undefined, timesheetDocumentDto)

            }

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const timesheetDocument = await TimesheetModel
                    .findOne({ _id:req.params._id, business:currentBusinessDoc._id })
                    .populate('applied enrolled withdrawn')

                const timesheetDocumentDto = timesheetAsBusinessResponseDto(timesheetDocument)

                return successHandler(undefined, timesheetDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateTimesheetActual(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            // get timesheet for user
            const timesheetDocument = await TimesheetModel
                .findOne({ _id:req.params._id })
                .populate({
                    path:'freelancer',
                    model:'Freelancer',
                    select:'name'
                })
                // .select('name')

                // {
                //         path:'freelancer',
                //         model:'Freelancer',
                //         select:'name profilePhoto'
                //     }
                // })

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(currentUserDoc.roles.includes('freelancer')){

                    const timesheetRequestDto = timesheetAsAllRequestDto({ actualByFreelancer:req.body })

                    // update actual time of timeshift with value { start } or { end }
                    if(timesheetRequestDto.actualByFreelancer?.start) timesheetDocument.actualByFreelancer.start = timesheetRequestDto.actualByFreelancer?.start
                    if(timesheetRequestDto.actualByFreelancer?.end) timesheetDocument.actualByFreelancer.end = timesheetRequestDto.actualByFreelancer?.end

                }

                if(currentUserDoc.roles.includes('business')){

                    const timesheetRequestDto = timesheetAsAllRequestDto({ actualByBusiness:req.body })

                    // update actual time of timeshift with value { start } or { end }
                    if(timesheetRequestDto.actualByBusiness?.start) timesheetDocument.actualByBusiness.start = timesheetRequestDto.actualByBusiness?.start
                    if(timesheetRequestDto.actualByBusiness?.end) timesheetDocument.actualByBusiness.end = timesheetRequestDto.actualByBusiness?.end

                }

                if(
                    timesheetDocument.actualByFreelancer?.start === timesheetDocument.actualByBusiness?.start
                    && timesheetDocument.actualByFreelancer?.end === timesheetDocument.actualByBusiness?.end
                ){

                    timesheetDocument.status = 'accepted'

                }

                const newMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'updateTimesheetActual',
                    data:timesheetDocument
                })

                timesheetDocument.save()
                newMutationDoc.save()

            })

            session.endSession()

            // return shift
            const timesheetResponseDto = timesheetAsAllResponseDto(timesheetDocument)

            return successHandler(undefined, timesheetDocument)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function disputeTimesheetActual(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            // get timesheet for user
            const timesheetDocument = await TimesheetModel
                .findOne({ _id:req.params._id })
                .populate({
                    path:'freelancer',
                    model:'Freelancer',
                    select:'name'
                })

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(
                    (
                        timesheetDocument.actualByFreelancer?.start
                        && timesheetDocument.actualByFreelancer?.end
                        && timesheetDocument.actualByFreelancer?.start
                        && timesheetDocument.actualByBusiness?.end
                    )
                    && (
                        timesheetDocument.actualByFreelancer?.start !== timesheetDocument.actualByBusiness?.start
                        || timesheetDocument.actualByFreelancer?.end !== timesheetDocument.actualByBusiness?.end
                    )
                ){

                    timesheetDocument.status = 'disputed'

                    const newMutationDoc = new MutationModel({
                        user:req.user._id,
                        action:'disputeTimesheetActual',
                        data:timesheetDocument
                    })

                    timesheetDocument.save()
                    newMutationDoc.save()

                }

            })

            session.endSession()

            // return shift
            const timesheetResponseDto = timesheetAsAllResponseDto(timesheetDocument)

            return successHandler(undefined, timesheetDocument)

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
    //         const timesheetDocument = await TimesheetModel.findOne({
    //             _id:req.query.timesheetId
    //         })
    //
    //         if(!timesheetDocument) return notFoundHandler('Timesheet')
    //         if(!timesheetDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')
    //
    //         const checkInTime = req.query.datetime || new Date()
    //
    //         const session = await connection.startSession()
    //         await session.withTransaction(async () => {
    //
    //             timesheetDoc.checkIn.push({
    //                 _id:freelancerDoc._id,
    //                 datetime:checkInTime
    //             })
    //
    //             const newMutationTimesheetDoc = new MutationModel({
    //                 user:req.user._id,
    //                 action:'reportCheckIn',
    //                 datetime:checkInTime
    //             })
    //
    //             timesheetDocument.mutations.push(newMutationTimesheetDoc._id)
    //             await timesheetDocument.save()
    //             await newMutationTimesheetDoc.save()
    //
    //         })
    //
    //         session.endSession()
    //
    //         const timesheetDocumentDto = timesheetAsBusinessResponseDto(timesheetDocument)
    //
    //         return successHandler(undefined, timesheetDocumentDto)
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
    //         const timesheetDocument = await TimesheetModel.findOne({
    //             _id:req.query.timesheetId
    //         })
    //
    //         if(!timesheetDocument) return notFoundHandler('Timesheet')
    //         if(!timesheetDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')
    //
    //         const checkOutTime = req.query.datetime || new Date()
    //
    //         const session = await connection.startSession()
    //         await session.withTransaction(async () => {
    //
    //             timesheetDoc.checkIn.push({
    //                 _id:freelancerDoc._id,
    //                 time:checkOutTime
    //             })
    //
    //             const newMutationTimesheetDoc = new MutationModel({
    //                 user:req.user._id,
    //                 action:'reportCheckOut',
    //                 time:checkOutTime
    //             })
    //
    //             timesheetDocument.mutations.push(newMutationTimesheetDoc._id)
    //             await timesheetDocument.save()
    //             await newMutationTimesheetDoc.save()
    //
    //         })
    //
    //         session.endSession()
    //
    //         const timesheetDocumentDto = timesheetAsBusinessResponseDto(timesheetDocument)
    //
    //         return successHandler(undefined, timesheetDocumentDto)
    //
    //     } catch (error) {
    //
    //         return errorHandler(undefined, error)
    //
    //     }
    //
    // }

}
