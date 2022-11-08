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

    const projectAsBusinessRequestDto = require('../../custom/dto/request/project/projectAsBusiness')
    const projectAsBusinessResponseDto = require('../../custom/dto/response/project/projectAsBusiness')

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

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const projectDocuments = await ProjectModel.find({ business:currentBusinessDoc._id })

                const projectDocumentsDto = projectAsBusinessResponseDto(projectDocuments)

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

            if(currentUserDoc.roles.includes('business')){

                const currentBusinessDoc = await getCurrentBusiness(req)

                const projectDocument = await ProjectModel.find({ _id:req.params._id, business:currentBusinessDoc._id })

                const projectDocumentDto = projectAsBusinessResponseDto(projectDocument)

                return successHandler(undefined, projectDocumentDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createProject(req){

        try {

            const currentUserDoc = await getCurrentUser(req)
            const currentBusinessDoc = await getCurrentBusiness(req)

            if(!currentBusinessDoc) return errorHandler(403, 'Forbidden')
            if(!currentUserDoc.roles.includes('business')) return errorHandler(403, 'Forbidden')

            const projectDto = projectAsBusinessRequestDto(req.body)

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

            const newProjectDocDto = projectAsBusinessResponseDto(response)

            return successHandler(undefined, newProjectDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function updateProjectById(req){

        try {

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc.roles.includes('business')) return errorHandler(403, 'Forbidden')

            const projectDto = projectAsBusinessRequestDto(req.body)

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

            const projectDocDto = projectAsBusinessResponseDto(response)

            return successHandler(undefined, projectDocDto)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function deleteProjectById(req){

        // only for business

        try {

            const currentBusinessDoc = await getCurrentBusiness(req)

            if(!currentBusinessDoc) return errorHandler(403, 'Forbidden')

            const projectDocument = await ProjectModel.findOneAndDelete({ _id:req.params._id })

            if(!projectDocument) return notFoundHandler('Project')

            return successHandler(undefined)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
