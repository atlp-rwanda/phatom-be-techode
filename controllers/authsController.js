import models from '../models';
import { hashPassword, jwtToken, comparePassword } from '../middleware/auth'
import cookieParser from 'cookie-parser';
import { success,fail,sendError } from "../function/respond.js";

const { users } = models;


    const signUp = async (req,res, ne) =>{
        try {
          let role = 'client';
            const { fullname, username, email, password} = req.body;
        const hash = hashPassword(password);
        const user = await users.create({fullname, username, email, role, password:hash});
        const token = jwtToken.createToken(user);
        return success(res,201, {token, user:{fullname,username,email, role, password:hash}}, "user created")
        } catch (e) {
          return sendError(res,500,null,e.massage);
        }
    };

    const signIn = async(req, res, next) => {
      
        try {
          const { email, password } = req.body;
          const user = await users.findOne({ where: { email } });
          if (user && comparePassword(password, user.password)) {
            const { fullname, username, role, email} = user;
            const token = jwtToken.createToken(user);
            res.cookie("access-token", token,{
              maxAge: 60*60*24,
            })
            return success(res, 200, {user:{fullname,username, role, email}, token}, "Logged in successfully")
          }
          return fail(res,401,null,"Invalid credential")
        } catch (e) {
          return sendError(res,500,null,e.massage);
        }
      }


      export  { signUp, signIn };