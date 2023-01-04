module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let UserModel, MutationModel, ProjectModel, notFoundHandler, successHandler, errorHandler, getCurrentUser

    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }
    try { ProjectModel = require('../../custom/models/project') } catch { ProjectModel = require('../../default/models/project') }
    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { getCurrentUser = require('../../custom/utils/getCurrentUser') } catch { getCurrentUser = require('../../default/utils/getCurrentUser') }

    const projectAsClientRequestDto = require('../../custom/dto/request/project/projectAsClient')
    const projectAsClientResponseDto = require('../../custom/dto/response/project/projectAsClient')

    return {
        getProjects,
        getProjectById,
        createProject,
        updateProjectById,
        deleteProjectById,
    }

    async function getProjects(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('client')){

                const currentClientDoc = await getCurrentClient(req)

                const projectDocuments = await ProjectModel.find({ client:currentClientDoc._id })

                const projectDocumentsDto = projectAsClientResponseDto(projectDocuments)

                return successHandler(undefined, projectDocumentsDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getProjectById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('client')){

                const currentClientDoc = await getCurrentClient(req)

                const projectDocument = await ProjectModel.find({ _id:req.params._id, client:currentClientDoc._id })

                const projectDocumentDto = projectAsClientResponseDto(projectDocument)

                return successHandler(undefined, projectDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createProject(req){

        try {

            const currentUserDoc = await getCurrentUser(req)
            const currentClientDoc = await getCurrentClient(req)

            if(!currentClientDoc) return errorHandler(403, 'Forbidden')
            if(!currentUserDoc.roles.includes('client')) return errorHandler(403, 'Forbidden')

            const projectDto = projectAsClientRequestDto(req.body)

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                projectDto.creator = currentUserDoc._id

                const newProjectDoc = new ProjectModel(projectDto)

                const newMutationDoc = new MutationModel({
                    user:currentUserDoc._id,
                    action:'create',
                    data:projectDto
                })

                newProjectDoc.mutations.push(newMutationDoc._id)

                response = await newProjectDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const newProjectDocDto = projectAsClientResponseDto(response)

            return successHandler(undefined, newProjectDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateProjectById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc.roles.includes('client')) return errorHandler(403, 'Forbidden')

            const projectDto = projectAsClientRequestDto(req.body)

            const projectDoc = await ProjectModel.findOne({ _id:req.params._id })

            if(!projectDoc) return notFoundHandler('Project')

            let response

            const session = await connection.startSession()
            await session.withTransaction(async () => {

                if(name) projectDoc.name = name
                if(description) projectDoc.description = description
                if(label) projectDoc.label = label
                if(datetime) projectDoc.datetime = datetime
                if(location) projectDoc.location = location
                if(active) projectDoc.active = active

                const newMutationDoc = new MutationModel({
                    user:req.user._id,
                    action:'update',
                    data:projectDto
                })

                response = await projectDoc.save()
                await newMutationDoc.save()

            })

            session.endSession()

            const projectDocDto = projectAsClientResponseDto(response)

            return successHandler(undefined, projectDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function deleteProjectById(req){

        // only for client

        try {

            const currentClientDoc = await getCurrentClient(req)

            if(!currentClientDoc) return errorHandler(403, 'Forbidden')

            const projectDocument = await ProjectModel.findOneAndDelete({ _id:req.params._id })

            if(!projectDocument) return notFoundHandler('Project')

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
