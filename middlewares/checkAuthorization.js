import { users , roles } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import { getRolesPermission } from "../controllers/rolesController.js"
import { jwtToken } from "./auth";
import { validateAction } from "../function/validation";


// This middleware will be called after login auth
const checkAuth = async (req,res,next) => {
    try {
        let userId = req.header('userId');
        if(req.userId){
            userId = req.userId;
        }
        const action  = req.header('action');
        const actionHasError = validateAction({ action }).error;
        
        /* c8 ignore next 3 */ 
        if(!userId){
            return fail(res,400,null,"UseId is required");
        }
        if(actionHasError){
            return fail(res,400,null, actionHasError.details[0].message );
        }

        /* ===================== Getting User =========================== */
        const user = await users.findAll({where: { id:userId }});
        let userExist = user.length;
        /* c8 ignore next 2 */ 
        if(!userExist) return fail(res,400,null,"User does not exist");
        
        const userRoleId = user[0].roleId;
        const userName = user[0].username;

        /* ============== Getting permssion list on user's role  ======================== */
        
        if(userRoleId == null){
            return fail(res,401,null,"Unauthorized");
        }

        const permissions = await getRolesPermission(userRoleId);
        let exist =  permissions.length;
        if(!exist) {
            return fail(res,401,null,"Unauthorized")
        }

        /* ==================== Getting user role's permission ========================= */
        const permissionList = permissions.filter(permission => permission == action ); 
        const permitted = permissionList.length; 

        /* ========================= If role is not permmitted ======================== */
        if(!permitted) {
            return fail(res,401,null,`${userName}'s role is not permitted to ${action}`); 
        }

        /* == Head to next controler == */ 
        next();
    /* c8 ignore next 2 */ 
    } catch (error) { return sendError(res,500,null,error.message);}
} 

const isLoggedIn = async (req , res , next) => {
    const authToken = req.header('auth-token');
    if(!authToken) return fail(res,401,null,"pleaseLogin",req);
    try {
        const token = authToken.split(" ")[1];
        const verified = jwtToken.verifyToken(token);
        
        if(verified.userId){
            req.userId = verified.userId;
            return next();
        }  
        /* c8 ignore next 1 */ 
    } catch (error) {return sendError(res,500,null,error.message);}
} 
export  { checkAuth , isLoggedIn }