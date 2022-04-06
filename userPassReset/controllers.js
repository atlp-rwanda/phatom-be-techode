import bcryptjs from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import handleResponse from '../controllers/handleResponse.js';
import { User } from '../models/user.js';
import ResetToken from './models.js';
import sendResetEmail from './utils.js';

export const GetUsers = async (_, res) => {
	const users = await User.find();
	return handleResponse(res, 200, users);
};

export const CreateUser = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
	if (user) return handleResponse(res, 409, res.__('user_conflict'));
	try {
		const newUser = User.create(req.body);
		await newUser.save();
		return handleResponse(res, 201, newUser);
	} catch (error) {
		return handleResponse(res, 400, { message: res.__('bad_data') });
	}
};

export const forgotPassword = async (req, res) => {
	const user = await User.findOneBy({ email: req.body.email });
    console.log(user)
	if (!user) return handleResponse(res, 400, res.__('email_notExit'));

	const resetoken = await ResetToken.findOneBy({ user });

	if (resetoken) {
		await resetoken.remove();
	}

	const time = new Date();
	const resetToken = ResetToken.create({
		token: uuid(),
		expiration: new Date(time.setSeconds(time.getSeconds() + 86400)),
	});
	resetToken.user = user;
	await resetToken.save();
	const { token } = resetToken;

	const link = `${process.env.BASE_URL}/api/v1/users/reset/check/${token}`;
	await sendResetEmail(link, req.body.email, user);

	return handleResponse(res, 200, { message: res.__('link_sent') });
};

export const resetPasswordCheck = async (req, res) => {
	const { token } = req.params;
	const resetToken = await ResetToken.findOneBy({ token });
	if (resetToken && resetToken.checkValid()) {
		const valid = resetToken.checkValid();
		return handleResponse(res, 200, { token, valid });
	}
	if (resetToken && !resetToken.checkValid()) {
		return handleResponse(res, 401, 'Token Expired');
	}
	return handleResponse(res, 401, 'Token invalid ');
};

export const resetPasswordCreate = async (req, res) => {
	const user = await ResetToken.findOneBy({ token: req.params.token });
	try {
		user.password = await bcryptjs.hash(req.body.password, 10);
		await user.save();
		return handleResponse(res, 200, res.__('successifully_reseted'));
	} catch (error) {
		return handleResponse(res, 500, error.message);
	}
};