import jwt from 'jsonwebtoken';

const generateToken = (payload, expiresIn) => {
	const token = jwt.sign(payload, process.env.USER_TOKEN, { expiresIn });
	return token;
};

export default generateToken;