require("dotenv").config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "127.0.0.1",
    port: 1025,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.PROTON_USER, // generated ethereal user
      pass: process.env.PROTON_PASSWORD, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    },
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
    transporter,
    sendmail
  };
