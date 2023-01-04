const fs = require('fs')
const path = require('path')

const PDFDocument = require('pdfkit')

const invoicesPath = path.join(__dirname, '../../private/invoices/')

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
    const invoiceAsFreelancerRequestDto = require('../../custom/dto/request/invoice/invoiceAsFreelancer')
    const invoiceAsFreelancerResponseDto = require('../../custom/dto/response/invoice/invoiceAsFreelancer')
    const invoiceAsClientRequestDto = require('../../custom/dto/request/invoice/invoiceAsClient')
    const invoiceAsClientResponseDto = require('../../custom/dto/response/invoice/invoiceAsClient')
    const ShiftModel = require('../../custom/models/shift')
    const FreelancerModel = require('../../custom/models/freelancer')
    const TimesheetModel = require('../../custom/models/timesheet')
    const InvoiceModel = require('../../custom/models/invoice')
    const getCurrentClient = require('../../custom/utils/getCurrentClient')
    const getCurrentFreelancer = require('../../custom/utils/getCurrentFreelancer')

    return {
        getInvoices,
        getInvoiceById,
        createInvoice,
    }

    async function getInvoices(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)

            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const freelancerDocument = await FreelancerModel
                    .findOne({ users:req.user._id })

                const invoices = await InvoiceModel
                    .find({ freelancer:freelancerDocument._id })
                    .populate({
                        path:'client',
                        model:'Client',
                        select:'name'
                    })

                const invoiceDocumentsDto = invoiceAsFreelancerResponseDto(invoices)

                return successHandler(undefined, invoiceDocumentsDto)

            }

            if(currentUserDoc.roles.includes('client')){

                const clientDocument = await ClientModel
                    .findOne({ users:req.user._id })

                const invoices = await InvoiceModel
                    .find({ client:clientDocument._id })
                    .populate({
                        path:'freelancer',
                        model:'Freelancer',
                        select:'name'
                    })

                const invoiceDocumentsDto = invoiceAsClientResponseDto(invoices)

                return successHandler(undefined, invoiceDocumentsDto)

            }

            return errorHandler(403, 'Forbidden')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function getInvoiceById(req){

        try {

            const user_id = req.user._id

            const currentUserDoc = await getCurrentUser(req)
            if(!currentUserDoc) return notFoundHandler('User')

            if(currentUserDoc.roles.includes('freelancer')){

                const currentFreelancerDoc = await getCurrentFreelancer(req)
                if(!currentFreelancerDoc) return notFoundHandler('Freelancer')

                const timesheets = await TimesheetModel
                    .find({
                        freelancer:currentFreelancerDoc._id,
                        status:'accepted'
                    })
                    .populate({
                        path:'client',
                        model:'Client',
                        select:'name'
                    })

                const timesheetDocumentsDto = timesheetAsAllResponseDto(timesheets)

                return successHandler(undefined, timesheets)

            }

            if(currentUserDoc.roles.includes('client')){

                const currentClientDoc = await getCurrentClient(req)
                if(!currentClientDoc) return notFoundHandler('Client')

                const timesheets = await TimesheetModel
                    .find({
                        client:currentClientDoc._id,
                        status:'accepted'
                    })
                    .populate({
                        path:'freelancer',
                        model:'Freelancer',
                        select:'name'
                    })

                const timesheetDocumentsDto = timesheetAsClientResponseDto(timesheets)

                return successHandler(undefined, timesheetDocumentsDto)

            }

            return errorHandler(403, 'Forbidden')

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

    async function createInvoice(req){

        try {

            const invoiceRequestDto = invoiceAsFreelancerRequestDto(req.body)

            const currentUserDoc = await getCurrentUser(req)
            if(!currentUserDoc) return notFoundHandler('User')

            const freelancerDoc = await FreelancerModel
                .findOne({ users:req.user._id })

            if(!freelancerDoc) return notFoundHandler('Freelancer')

            const timesheetDocuments = await TimesheetModel
                .find({
                    _id:invoiceRequestDto.timesheets,
                    client:invoiceRequestDto.client,
                    freelancer:freelancerDoc._id
                })
                .populate({
                    path:'shift',
                    model:'Shift',
                    select:'price'
                })

            // for all timesheets calculate hours * amount
            const totalHoursAmount = timesheetDocuments.map(timesheet => {

                const timespanInMS = new Date(timesheet.actualByClient.end).getTime() - new Date(timesheet.actualByClient.start).getTime()

                return {
                    hours:Math.floor(timespanInMS / 1000 / 60 / 60),
                    price:parseFloat(timesheet.shift.price),
                }

            })

            const invoiceDocument = await InvoiceModel({
                name:`${invoiceRequestDto.clientName}_${Date.now()}.pdf`,
                freelancer:freelancerDoc._id,
                client:invoiceRequestDto.client,
                timesheets:invoiceRequestDto.timesheets,
                hours:totalHoursAmount.map(total => total.hours).reduce((a, b) => a + b, 0),
                amount:totalHoursAmount.map(total => total.hours * total.price).reduce((a, b) => a + b, 0),
                billingDate:Date.now()
            })

            // create pdf here
            const pdfDocument = new PDFDocument()
            const invoicePath = path.join(invoicesPath,freelancerDoc.name)

            fs.mkdirSync(invoicePath, { recursive: true })

            pdfDocument.pipe(fs.createWriteStream(path.join(invoicePath, invoiceDocument.name), { flag: 'wx' }))

            pdfDocument
                .text(`
                    INVOICE

                    ${invoiceDocument}
                `)

            pdfDocument.end()

            // save all timesheets as billed
            const timesheetDocs = await TimesheetModel.find({ _id:invoiceRequestDto.timesheets })
            for (let timesheet of timesheetDocs){

                timesheet.status = 'billed'
                timesheet.save()

            }

            await invoiceDocument.save()

            if(currentUserDoc.roles.includes('freelancer')){

                const invoiceResponseDto = invoiceAsFreelancerResponseDto(invoiceDocument)

                return successHandler(undefined, invoiceResponseDto)

            }

            if(currentUserDoc.roles.includes('client')){

                const invoiceResponseDto = invoiceAsClientResponseDto(invoiceDocument)

                return successHandler(undefined, invoiceResponseDto)

            }

        } catch (error) {

            return errorHandler(undefined, error)

        }

    }

}
