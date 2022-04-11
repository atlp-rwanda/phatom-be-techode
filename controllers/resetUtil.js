import bcrypt from 'bcrypt';
import { config }  from 'dotenv';
import { body, validationResult } from 'express-validator';
import Nodemailer from 'nodemailer';
import User from '../models/users';
import renderMail from './renderMail';
config()
const sendEmail = async (link, email, user) => {	
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
				to: `${email}, ${user.fullname} <${email}>`,
			},
			subject: 'Password reset',
			html: renderMail(link, user),
			text: link,
		};
		await transport.sendMail(message);
		return true;
	} catch (error) {
		return error.message;
	}
};


export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	const extractedErrors = {};
	errors.array().forEach((err) => {
		extractedErrors[err.param] = err.msg;
	});
	return res.status(400).json({ extractedErrors });
};

export const emailValidation = () => [
	body('email', 'valid email required').notEmpty().isEmail(),
];
export const passwordValidation = () => [
	body('password', 'A strong password is required')
		.isStrongPassword()
		.withMessage('Mix or char/symbol/number/ and more than 6 characters')
		.bail()
		.customSanitizer((value) => {
			const hash = bcrypt.hash(value, 10);
			return hash;
		}),
];

export const createUserValidation = () => [
	body('email', 'A valid email required')
		.notEmpty()
		.isEmail()
		.normalizeEmail()
		.bail()
		.custom((email) => {
			return User.findOne({ where: { email } }).then((user) => {
				if (user) return Promise.reject('User exists');
			});
		}),
	body('password', 'A strong password required')
		.isStrongPassword()
		.bail()
		.customSanitizer((value) => {
			const hash = bcrypt.hash(value, 10);
			return hash;
		}),
	body('firstName', 'this too is required').notEmpty(),
];


export default sendEmail;
