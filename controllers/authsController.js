import { users } from '../models';
import { hashPassword, jwtToken, comparePassword } from '../middleware/auth'
import cookieParser from 'cookie-parser';
import dotenv  from "dotenv"
import { success, fail, sendError } from "../function/respond.js";

const signUp = async (req, res) => {
  try {  
    
    const { fullname, username, email, password } = req.body;
    const findUser = await users.findAll({where : {email}});
    if(findUser.length > 0) return sendError(res, 409, {error :null}, "This email account exist");

    const hash = hashPassword(password);
    const user = await users.create({ fullname, username, email, role : null, password: hash });
    const token = jwtToken.createToken(user);
    return success(res, 201, { token, user: findUser }, "user created")
  } catch (e) {
    return sendError(res, 500, {error :null}, e.message);
  }
};

const signIn = async (req, res, next) => {

  try {
    const { email, password } = req.body;
    const user = await users.findOne({ where: { email } });
    if (user && comparePassword(password, user.password)) {
      const { fullname, username, role, email } = user;
      const token = jwtToken.createToken(user);
      res.cookie("access-token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      })
      
      return success(res, 200, { user: { fullname, username, role, email }, token }, "loginMessage",req)
    }
    return fail(res, 401, null, "wrongCredential",req)
  } catch (e) {
    return sendError(res, 500, null, e.massage);
  }
}


export { signUp, signIn };