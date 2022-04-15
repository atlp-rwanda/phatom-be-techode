import { check, validationResult } from 'express-validator';

export const plateNumberValidation = () => [
	check('plate', "A valid plate is formated like 'RAB456B' and start with R")
		.toUpperCase()
		.custom((value) => {
			const pattern = /^R[A-Z]{2}[0-9]{3}[A-Z]{1}$/;
			if (!pattern.test(value))
				return Promise.reject(
					"A valid plate is formated like 'RAB456B' and start with R"
				);
			return Promise.resolve();
		}),
];

export const routeCodeValidation = () => [
	check('code', 'A valid code is required').notEmpty().toUpperCase(),
];

export const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) return next();
	const extractedErrors = {};
	errors.array().forEach((err) => {
		extractedErrors[err.param] = err.msg;
	});
	return res.status(400).json(extractedErrors);
};
