const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config()

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {

    user: process.env.nodemailer_user,
    pass: process.env.nodemailer_pass,
  },
});


function sendmail(toEmail, subject, content) {
    const Mailoptions = {
        from: process.env.nodemailer_user,
        to: toEmail,
        subject: subject,
        html: content,
    }

    transporter.sendMail(Mailoptions, (error, info) => {
        if(error) {
            console.log("error", error)
        } else{
            console.log("email sent", info.response)
        }
    })
    

}

module.exports = { sendmail}