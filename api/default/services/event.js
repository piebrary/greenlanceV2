module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, EventModel, notFoundHandler, successHandler, errorHandler, eventRequestDto, eventResponseDto

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { EventModel = require('../../custom/models/event') } catch { EventModel = require('../../default/models/event') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { eventRequestDto = require('../../custom/dto/request/event/event/') } catch { eventRequestDto = require('../../default/dto/request/event/event') }
    try { eventResponseDto = require('../../custom/dto/response/event/event') } catch { eventResponseDto = require('../../default/dto/response/event/event') }

    return {
        getEvents,
        getEventById,
        createEvent,
        updateEventById,
        deleteEventById
    }

    async function getEvents(req){

        try {

            const user_id = req.user._id

            const eventDocuments = await EventModel
                .find()
                .exec()

            const eventDocumentsDto = eventResponseDto(eventDocuments)

            return successHandler(undefined, eventDocumentsDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getEventById(req){

        try {

            const eventId = req.params._id

            const eventDocument = await EventModel
                .findOne({ _id:eventId })
                .exec()

            if(!eventDocument){

                return notFoundHandler('Event')

            }

            const eventDocumentDto = eventResponseDto(eventDocument)

            return successHandler(undefined, eventDocumentDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createEvent(req){

        try {

            const {
                name,
                description,
                label,
                datetime,
                location,
                recurring,
                rights,
                active
            } = eventRequestDto(req.body)

            const userId = req.user._id

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                const newEventDoc = new EventModel({
                    name,
                    description,
                    label,
                    datetime,
                    location,
                    recurring,
                    active,
                    creator:userId
                })

                const newMutationDoc = new MutationModel({
                    user:userId,
                    action:'create',
                    data:{
                        name,
                        description,
                        label,
                        datetime,
                        location,
                        recurring,
                        active,
                    }
                })

                newEventDoc.mutations.push(newMutationDoc._id)

                response = await newEventDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const newEventDocDto = eventResponseDto(response)

            return successHandler(undefined, newEventDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateEventById(req){

        try {

            const eventId = req.params._id

            const {
                name,
                description,
                label,
                datetime,
                location,
                recurring,
                rights,
                active
            } = eventRequestDto(req.body)

            const eventDoc = await EventModel
                .findOne({ eventId })
                .exec()

            if(!eventDoc){

                return notFoundHandler('Event')

            }

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(name) eventDoc.name = name
                if(description) eventDoc.description = description
                if(label) eventDoc.label = label
                if(datetime) eventDoc.datetime = datetime
                if(location) eventDoc.location = location
                if(recurring) eventDoc.recurring = recurring
                if(rights) eventDoc.rights = rights
                if(active) eventDoc.active = active

                const newMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'update',
                    data:{
                        name,
                        description,
                        label,
                        datetime,
                        location,
                        recurring,
                        rights,
                        active
                    }
                })

                response = await eventDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const eventDocDto = eventResponseDto(response)

            return successHandler(undefined, eventDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function deleteEventById(req){

        try {

            const eventId = req.params._id

            const eventDocument = await EventModel
                .findOneAndDelete({ _id:eventId })
                .exec()

            if(!eventDocument){

                return notFoundHandler('Event')

            }

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
