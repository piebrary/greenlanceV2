const passport = require('passport')
const path = require('path')
const fs = require('fs')

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
        process.env.API_PREFIX + '/v1/s/invoice/pdf/:name',
        passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            const result = await invoiceService.getInvoicePdfByName(req)

            console.log(result)

            if(result.status === 200){

                const filepath = path.join(__dirname, '..', '..', '..', '..', '..', 'private', 'invoices', result.body.freelancer.name, result.body.name)

                // console.log(filepath)
                //
                // res
                //     .status(result.status)
                //     .sendFile(filepath)

                    var file = fs.createReadStream(filepath);
    // var stat = fs.statSync('./public/modules/datacollectors/output.pdf');
    // res.setHeader('Content-Length', stat.size);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
    file.pipe(res);

    return res.end()

            }

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
