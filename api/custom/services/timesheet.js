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
    const getCurrentBusiness = require('../../custom/utils/getCurrentBusiness')
    const getCurrentFreelancer = require('../../custom/utils/getCurrentFreelancer')

    return {
        getTimesheets,
        getTimesheetById,
        checkInById,
        checkOutById,
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
                    .populate('applied enrolled withdrawn checkIn checkOut')

                const timesheetDocumentDto = timesheetAsBusinessResponseDto(timesheetDocument)

                return successHandler(undefined, timesheetDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function checkInById(req){

        try {

            const freelancerDoc = await FreelancerModel.findOne({ user:req.user._id })
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const timesheetDocument = await TimesheetModel.findOne({
                _id:req.query.timesheetId
            })

            if(!timesheetDocument) return notFoundHandler('Timesheet')
            if(!timesheetDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')

            const checkInTime = req.query.datetime || new Date()

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                timesheetDoc.checkIn.push({
                    _id:freelancerDoc._id,
                    datetime:checkInTime
                })

                const newMutationTimesheetDoc = new MutationModel({
                    user:req.user._id,
                    action:'reportCheckIn',
                    datetime:checkInTime
                })

                timesheetDocument.mutations.push(newMutationTimesheetDoc._id)
                await timesheetDocument.save()
                await newMutationTimesheetDoc.save()

            })

            session.endSession()

            const timesheetDocumentDto = timesheetAsBusinessResponseDto(timesheetDocument)

            return successHandler(undefined, timesheetDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function checkOutById(req){

        try {

            const freelancerDoc = await FreelancerModel.findOne({ user:req.user._id })
            if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

            const timesheetDocument = await TimesheetModel.findOne({
                _id:req.query.timesheetId
            })

            if(!timesheetDocument) return notFoundHandler('Timesheet')
            if(!timesheetDocument.enrolled.includes(freelancerDoc._id)) return errorHandler(409, 'Freelancer is not enrolled')

            const checkOutTime = req.query.datetime || new Date()

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                timesheetDoc.checkIn.push({
                    _id:freelancerDoc._id,
                    time:checkOutTime
                })

                const newMutationTimesheetDoc = new MutationModel({
                    user:req.user._id,
                    action:'reportCheckOut',
                    time:checkOutTime
                })

                timesheetDocument.mutations.push(newMutationTimesheetDoc._id)
                await timesheetDocument.save()
                await newMutationTimesheetDoc.save()

            })

            session.endSession()

            const timesheetDocumentDto = timesheetAsBusinessResponseDto(timesheetDocument)

            return successHandler(undefined, timesheetDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
