import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();


export const jwtToken = {
  createToken({ id, username:email }) {
    return jwt.sign(
      { userId: id, email },
      process.env.JWT_SECRETE,
      { expiresIn: '24h' }
    );
  },
  verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRETE, { expiresIn: '24h' });
    return decoded;
  }
};

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);