import nodemailer from 'nodemailer';
import logger from '../configs/winston.js';
// eslint-disable-next-line import/no-named-as-default
import renderEmail from './emailMessage.js';

const sendResetEmail = async (link, email, user) => {
	const transport = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: process.env.USER,
			pass: process.env.PASS,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});
	const message = {
		from: 'techcoders.andela@gmail.com',
		to: email,
		subject: 'Password reset request',
		text: link,
	};

	try {
		await transport.sendMail(message);
		logger.info('Reset password email link has been sent');
		return true;
	} catch (error) {
		logger.error(error.message);
		return false;
	}
};

export default sendResetEmail;