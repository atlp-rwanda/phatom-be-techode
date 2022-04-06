import { body, validationResult } from 'express-validator';
import handleResponse from '../controllers/handleResponse.js';

const validateEmail = () => [
	body('email', 'email_required')
		.notEmpty()
		.isEmail()
		.withMessage('email_not_valid'),
];
export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	const extractedErrors = {};
	errors.array().forEach((err) => {
		extractedErrors[err.param] = err.msg;
	});
	return handleResponse(res, 400, extractedErrors);
};

export default validateEmail;