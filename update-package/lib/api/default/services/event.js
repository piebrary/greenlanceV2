module.exports = mode => {

    let UserModel, EventModel, notFoundHandler, successHandler, errorHandler, eventRequestDto, eventResponseDto

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { EventModel = require('../../custom/models/event') } catch { EventModel = require('../../default/models/event') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { eventRequestDto = require('../../custom/dto/request/event/event/') } catch { eventRequestDto = require('../../default/dto/request/event/event') }
    try { eventResponseDto = require('../../custom/dto/response/event/event') } catch { eventResponseDto = require('../../default/dto/response/event/event') }

    return {
        getEvents,
        getEvent,
        createEvent,
        updateEvent,
        deleteEvent
    }

    async function getEvents(req){

        try {

            const user_id = req.user._id

            const eventDocuments = await EventModel
                .find({ 'rights.view':user_id })
                .exec()

            const eventDocumentsDto = eventDocuments.map(t => eventResponseDto(t))

            return successHandler(undefined, eventDocumentsDto)

        } catch (error) {

            if(process.env.ENVIRONMENT === 'development'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(process.env.ENVIRONMENT === 'production'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    async function getEvent(req){

        try {

            const user_id = req.user._id

            const eventDocument = await EventModel
                .findOne({ 'rights.view':user_id })
                .exec()

            if(!eventDocument) return notFoundHandler('Event')

            const eventDocumentDto = eventResponseDto(eventDocument)

            return successHandler(undefined, eventDocumentDto)

        } catch (error) {

            if(process.env.ENVIRONMENT === 'development'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(process.env.ENVIRONMENT === 'production'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    async function createEvent(req){

        try {

            const {
                title,
                body,
                category,
                date,
                time,
                location,
                recurring,
                rights,
                active
            } = eventRequestDto(req.body)

            const user_id = req.user._id

            const newEventDocument = new EventModel({
                title,
                body,
                category,
                time,
                date,
                location,
                recurring,
                rights:{
                    view:[user_id],
                    edit:[user_id]
                },
                active,
                creator:user_id
            })

            const result = await newEventDocument.save()
            const newEventDocumentDto = eventResponseDto(result)

            return successHandler(undefined, newEventDocumentDto)

        } catch (error) {

            if(process.env.ENVIRONMENT === 'development'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(process.env.ENVIRONMENT === 'production'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    async function updateEvent(req){

        try {

            const {
                _id,
                title,
                body,
                category,
                date,
                time,
                location,
                recurring,
                rights,
                active
            } = req.body

            const user_id = req.user

            const eventDocument = await EventModel
                .findOne({
                    _id,
                    'rights.edit':user_id
                 })
                .exec()

            if(!eventDocument){

                return notFoundHandler('Event')

            }

            if(title) eventDocument.title = title
            if(body) eventDocument.body = body
            if(category) eventDocument.category = category
            if(date) eventDocument.date = date
            if(time) eventDocument.time = time
            if(location) eventDocument.location = location
            if(recurring) eventDocument.recurring = recurring
            if(rights) eventDocument.rights = rights
            if(active) eventDocument.active = active


            const result = await eventDocument.save()
            const eventDocumentDto = eventResponseDto(result)

            return successHandler(undefined, eventDocumentDto)

        } catch (error) {

            if(process.env.ENVIRONMENT === 'development'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(process.env.ENVIRONMENT === 'production'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

    async function deleteEvent(req){

        try {

            const event_id = undefined// req.body._id
            const user_id = req.user

            const eventDocument = await EventModel
                .findOneAndDelete({
                    _id:event_id,
                    'rights.edit':user_id
                })
                .exec()

            if(!eventDocument){

                return notFoundHandler('Event')

            }

            return successHandler(undefined)

        } catch (error) {

            if(process.env.ENVIRONMENT === 'development'){

                console.log(error)

                return errorHandler(undefined, error)

            }

            if(process.env.ENVIRONMENT === 'production'){

                return errorHandler(undefined, 'Unknown error')

            }

        }

    }

}
