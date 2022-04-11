import { v4 as uuid } from 'uuid';
import  { users, resetTokens }  from '../models';
import db from '../models/index.js'
import sendMail from './resetUtil.js';

export const forgotPassword = async (req, res) => {
	
	try {
		const { email } = req.body;
		const user = await users.findOne({ where: { email } });	
		if (!user) return res.status(400).json({ message: 'User not found' });
		
		/* ========= Deleting token assigned to this users ========== */ 
		await resetTokens.destroy({
			where: { user: user.id.toString() },
		});
		
		
		/* ======== creating new token for this user ====== */ 
		const token = uuid() ;
		const generateToken = await resetTokens.create({
			user: user.id,
			token			
		});	
		
		/* ========= Generating link ================== */ 
		const link = `${process.env.BASE_URL || 'http://localhost:5000/api/v1/accounts/reset-password/'}${generateToken.token}`;
		const isSend = await sendMail(link, email, user);
		
		if(isSend == true) return res.status(200).json({ message:"link has been sent to your email" });
		throw new Error(`Email has not been sent due to: ${isSend}`);		
		
	}catch (error) {
		return res.status(500).json({error: error.message});
	}
};

export const validateToken = async (req, res) => {
	const { token } = req.params;
	const resetoken = await resetTokens.findOne({ where: { token } });

	/* ======== Checking if token exist  =================== */ 
	if (!resetoken) return res.status(400).json({ message: 'Token does not exist' });

	/* ======== Checking if token is valid  ========== */ 
	const tokenIsValid = await resetoken.checkValid();
	if (!tokenIsValid){
		await resetoken.destroy();
		return res.status(400).json({ message: 'Token has expired' });
	}
	return res.status(200).json(resetoken);
};

export const changePasswordPost = async (req, res) => {
	const { token } = req.params;
	const newPassword = req.body.password;
	/* ===================== Getting token ===================== */
	const resetoken = await resetTokens.findOne({ where: { token } });
	if (!resetoken) return res.status(400).json({ message: 'Token does not exist' });

	/* ==== Checking if token is valid  ====== */ 
	const tokenIsValid = await resetoken.checkValid();
	if (!tokenIsValid)
		return res.status(400).json({ message: 'expired' });
	
	/* ==== Getting user to reset password for ====== */ 
	const user = await users.findByPk(resetoken.user);
	user.password = newPassword ;

	/* ====  save new password ====== */ 
	const saveUser = await user.save();

	/* === destroying the token === */ 
	await resetoken.destroy();
	return res.json(saveUser);
};
