import { v4 as uuid } from 'uuid';
import resetToken from '../models';
import { users } from '../models';
import sendMail from './resetUtil.js';

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	const user = await users.findOne({ where: { email } });
	if (!user) return res.status(400).json({ message: 'User not found' });
	await resetToken.destroy({
		where: { user: user.id.toString() },
	});
	const time = new Date();
	time.setSeconds(time.getSeconds() + 7200);
	const token = await resetToken.create({
		user: user.id,
		token: uuid(),
		expiration: time,
	});
	const link = `${
		process.env.BASE_URL ||
		'http://localhost:5000/api/v1/accounts/reset-password/'
	}${token.token}`;
	await sendMail(link, email, user);
	return res.status(200).json(
		{
			message:"link has been sent to your email"
		}
	);
};

export const changePasswordGet = async (req, res) => {
	const { token } = req.params;
	const resetoken = await resetToken.findOne({ where: { token } });
	if (!resetoken) return res.status(400).json({ message: 'No token' });
	if (!(await resetoken.checkValid())) {
		await resetoken.destroy();
		return res.status(400).json({ message: 'expired' });
	}
	return res.json(resetoken);
};

export const changePasswordPost = async (req, res) => {
	const { token } = req.params;
	const resetoken = await resetToken.findOne({ where: { token } });
	if (!resetoken) return res.status(400).json({ message: 'No token' });
	if (!(await resetoken.checkValid()))
		return res.status(400).json({ message: 'expired' });
	const user = await users.findByPk(resetoken.user);
	user.password = req.body.password;
	const saveUser = await user.save();
	await resetoken.destroy();
	return res.json(saveUser);
};
