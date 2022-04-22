import bcrypt from 'bcrypt';
import { config }  from 'dotenv';
import { body, validationResult } from 'express-validator';
import Nodemailer from 'nodemailer';
import User from '../models/users';
import renderMail from './renderMail';
config()
const sendEmail = async (link, email, user = null , subject = "Password reset") => {	
	try {
		const transport = Nodemailer.createTransport({
			host: process.env.SERVICE,
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		});
		const message = {
			from: process.env.EMAIL_USER,
			to: email,
			envelope: {
				from: `Phantom Techode <${process.env.EMAIL_USER}>`,
				to: `${email}, ${user != null ? user.fullname : ""} <${email}>`,
			},
			subject: subject,
			html: renderMail(link, user),
			text: link,
		};
		await transport.sendMail(message);
		/* c8 ignore next 4*/
		return true;
	} catch (error) {
		return error.message;
	}
};


export default sendEmail;
