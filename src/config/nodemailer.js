const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    host: "mail.mylikita.clinic",
    port: 587,
    secure: false,
    auth: {
        user: "hello@mylikita.clinic",
        pass: "Bits-his@2019"
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transport