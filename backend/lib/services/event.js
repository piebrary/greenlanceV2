const UserModel = require('../models/user')
const EventModel = require('../models/event')

const notFoundHandler = require('../handlers/notFound')
const successHandler = require('../handlers/success')
const errorHandler = require('../handlers/error')

const eventRequestDto = require('../dto/request/event')
const eventResponseDto = require('../dto/response/event')

module.exports = mode => {

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

            const userDocument = await UserModel
                .find({ _id:user_id })
                .populate('events')
                .exec()

            if(!userDocument) return notFoundHandler('User')

            const eventDocumentsDto = userDocument.events.map(t => {
                eventResponseDto(t, user_id)
            })

            return successHandler(undefined, eventDocumentsDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }

    }

    async function getEvent(req){

        try {

            const user_id = req.user._id

            const eventDocument = await EventModel
                .find({ users:user_id })
                .exec()

            if(!eventDocument) return notFoundHandler('Event')

            const eventDocumentDto = eventResponseDto(eventDocument)

            return successHandler(undefined, eventDocumentDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }

    }

    async function createEvent(req){

        try {

            const {
                title,
                body,
                time,
                active,
                creator
            } = eventRequestDto(req.body)

            const { _id } = req.user

            const newEventDocument = new EventModel({
                title,
                body,
                time,
                active,
                creator
            })

            const result = await newEventDocument.save()
            const newEventDocumentDto = eventResponseDto(result)

            return successHandler(undefined, newEventDocumentDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }

    }

    async function updateEvent(req){

        try {

            const {
                _id,
                name,
                description,
                project,
                time,
                location
            } = req.body

            const eventDocument = await EventModel
                .find({ _id })
                .exec()

            const { business_id } = req.user

            const currentBusiness = await BusinessModel
                .findOne({ users:business_id })
                .exec()

            if(eventDocument.business !== currentBusiness._id){

                return errorHandler(403, 'Forbidden')

            }

            if(name){

                eventDocument.name = name

            }

            if(description){

                eventDocument.description = description

            }

            if(project && currentBusiness.projects.includes(project)){

                eventDocument.project = project

            }

            if(time){

                eventDocument.time = time

            }

            if(location){

                eventDocument.location = location

            }

            const result = await eventDocument.save()
            const eventDocumentDto = eventResponseDto(result)

            return successHandler(undefined, eventDocumentDto)

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }

    }

    async function deleteEvent(req){

        try {

            const { _id } = req.params

            const { business_id } = req.user

            const currentBusiness = await BusinessModel
                .findOne({ users:business_id })
                .exec()

            const eventDocument = await EventModel
                .findOneAndDelete({
                    business:currentBusiness._id,
                    _id
                })
                .exec()

            return successHandler(undefined, )

        } catch (error) {

            if(mode === 'DEV'){

                console.log(error)

                return errorHandler(500, error)

            }

            if(mode === 'PROD'){

                return errorHandler(500, 'Unknown error')

            }

        }

    }

}
