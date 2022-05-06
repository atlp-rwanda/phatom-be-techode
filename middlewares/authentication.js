import { config } from 'dotenv';
import { jwtToken } from './auth';

config();



export const adminAuth = async (req , res , next) => {
  /* c8 ignore next 13 */
  try {
    let token = req.header("auth-token");
   
    let bearerToken =  req.header("auth-token").split(" ");
    if(bearerToken.length > 1 ){
      token = bearerToken[1];
    }   
    
    const verified = jwtToken.verifyToken(token);

    if(verified.userId) return next()
    return  res.status(401).json({'status': 'fail','code': 401,'message' : "Not authorized", "data": null});
      
  } catch (error) { return  res.status(401).json({'status': 'fail','code': 401,'message' : error.message, "data": null}); }
  
}

export default adminAuth