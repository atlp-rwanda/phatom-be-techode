"use strict"
import nodemailer from "nodemailer"
import dotEnv from 'dotenv'

dotEnv.config();

async function sendMail(to, subject, text) {
    // let testAcount = nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    })

    let info = await transporter.sendMail({
        from: '"Phantom 👻" <foo@example.com>', 
        to: to, 
        subject: subject, 
        text: text, 
        html: `<b>${text}</b>`, 
    })

    console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export default sendMail 