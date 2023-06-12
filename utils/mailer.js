require("dotenv").config()
const nodemailer = require("nodemailer");

// For use with Protonmail; Must use Protonmail Bridge
// const transporter = nodemailer.createTransport({
//     host: "127.0.0.1",
//     port: 1025,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.PROTON_USER,
//       pass: process.env.PROTON_PASSWORD,
//     },
//     tls: {
//         rejectUnauthorized: false
//     },
//   });

  // For use with Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_GENERATED_PASSWORD
    }
  });

  const sendmail = async (from, to, subject="Hello ✔", text, html="<b>Hello world?</b>") => {
    let info = await transporter.sendMail({
        from: `John White 👻 <${from}>`, // sender address
        to: `${to}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${text}`, // plain text body
        html: `${html}`, // html body
      });

      return info;
  }

  module.exports = {
    sendmail
  };
