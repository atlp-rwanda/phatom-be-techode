import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();



export const adminAuth = async (req , res , next) => {
  /* c8 ignore next 13 */
  try {
     const token = req.header("auth-token");
      const verified = jwt.verify(token , "Techode");

      if(verified.id) return next()
      return  res.status(401).json({'status': 'fail','code': 401,'message' : "Not authorized", "data": null});
      console.log(verified)
      
  } catch (error) {
   return  res.status(401).json({'status': 'fail','code': 401,'message' : "Not authorized", "data": null});
  }
  
}