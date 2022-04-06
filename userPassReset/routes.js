import { Router } from 'express';
import {
	forgotPassword,
	resetPasswordCheck,
	resetPasswordCreate,
} from './controllers.js';
import validateEmail, { validate } from './emailValidation.js';

const resetPasswordRouter = Router();
resetPasswordRouter.get('/check/:token', resetPasswordCheck);
resetPasswordRouter.post('/change/:token', resetPasswordCreate);
resetPasswordRouter.post('/email', validateEmail(), validate, forgotPassword);

export default resetPasswordRouter;