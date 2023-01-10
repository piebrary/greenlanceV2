module.exports = async server => {

    const { express, db } = server
    const connection = await db.connection

    let notFoundHandler, successHandler, errorHandler, UserModel, EventModel, MutationModel

    try { notFoundHandler = require('../../custom/handlers/notFound') } catch { notFoundHandler = require('../../default/handlers/notFound') }
    try { successHandler = require('../../custom/handlers/success') } catch { successHandler = require('../../default/handlers/success') }
    try { errorHandler = require('../../custom/handlers/error') } catch { errorHandler = require('../../default/handlers/error') }
    try { UserModel = require('../../custom/models/user') } catch { UserModel = require('../../default/models/user') }
    try { EventModel = require('../../custom/models/event') } catch { EventModel = require('../../default/models/event') }
    try { MutationModel = require('../../custom/models/mutation') } catch { MutationModel = require('../../default/models/mutation') }

    const ShiftModel = require('../../custom/models/shift')
    const ClientModel = require('../../custom/models/client')
    const FreelancerModel = require('../../custom/models/freelancer')
    const InvoiceModel = require('../../custom/models/invoice')
    const ProjectModel = require('../../custom/models/project')
    const ReviewModel = require('../../custom/models/review')
    const TimesheetModel = require('../../custom/models/timesheet')

    return {
        getDatabaseCollections,
    }

    async function getDatabaseCollections(req){

        try {

            const collections = {}

            const users = await UserModel
                .find()

            collections.users = users

            const events = await EventModel
                .find()

            collections.events = events

            const mutations = await MutationModel
                .find()

            collections.mutations = mutations

            const shifts = await ShiftModel
                .find()

            collections.shifts = shifts

            const clients = await ClientModel
                .find()

            collections.clients = clients

            const freelancers = await FreelancerModel
                .find()

            collections.freelancers = freelancers

            const invoices = await InvoiceModel
                .find()

            collections.invoices = invoices

            const projects = await ProjectModel
                .find()

            collections.projects = projects

            const reviews = await ReviewModel
                .find()

            collections.reviews = reviews

            const timesheets = await TimesheetModel
                .find()

            collections.timesheets = timesheets

            return successHandler(undefined, collections)

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
