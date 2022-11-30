const passport = require('passport')

module.exports = async server => {

    const { express } = server

    const InvoiceService = require('../../../../../custom/services/invoice')
    const invoiceService = await InvoiceService(server)

    express.get(
        process.env.API_PREFIX + '/v1/s/invoice/:_id',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await invoiceService.getInvoiceById(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.get(
        process.env.API_PREFIX + '/v1/s/invoices',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await invoiceService.getInvoices(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )

    express.post(
        process.env.API_PREFIX + '/v1/s/invoice',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await invoiceService.createInvoice(req)

            res
                .status(result.status)
                .send(result.body)

        }
    )
}
