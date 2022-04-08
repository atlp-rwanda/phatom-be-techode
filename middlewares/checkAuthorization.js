import { users , roles } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import { getRolesPermission } from "../controllers/rolesController.js"


// This middleware will be called after login authentication
const checkAuth = async (req,res,next) => {
    try {
        // const userId  = req.userId;
        const userId  = req.header('userId');
        const action  = req.header('action');
        if(!userId) return fail(res,400,null,"UseId is required");

        if(action.trim().length == 0) return fail(res,400,null,"Please provide the action to perform");
        /* ===================== Getting User =========================== */
        const user = await users.findAll({where: { id:userId }});
        let userExist = user.length;
        if(!userExist) return fail(res,400,null,"User does not exist");
        const userRoleId = user[0].roleId;
        const userName = user[0].username;

        /* ============== Getting permssion list on user's role  ======================== */
        
        if(userRoleId == null) return fail(res,401,null,"Unauthorized")

        const permissions = await getRolesPermission(userRoleId);
        let exist =  permissions.length;
        if(!exist) return fail(res,401,null,"Unauthorized")

        /* ==================== Getting user role's permission ========================= */
        const permissionList = permissions.filter(permission => permission == action ); 
        const permitted = permissionList.length; 

        /* ========================= If role is not permmitted ======================== */
        if(!permitted) return fail(res,401,null,`${userName}'s role is not permitted to ${action}`); 

        /* == Head tonext controler == */ 
        next();

    } catch (error) {
        return sendError(res,500,null,error.message);
    }
} 
export default checkAuth