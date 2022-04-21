import { permissionExist } from "../controllers/permissionsController";
import { roleExist } from "../controllers/rolesController";
import { fail } from "../function/respond";

export const permssionRoleExist = async (req,res,next) =>{
    const { roleid , permissionid } = req
    /* =================== Start:: validate if permssions exsist ==================  */ 
    const pExist = await permissionExist(permissionid);
    if(pExist.length == 0){
        return fail(res,400,null,"permissionDoesNotExist",req);
    }


    /* =================== Start:: Validate if role exist ==================  */ 
    const rExist = await roleExist(roleid);
    if(rExist.length == 0 ) {
        return fail(res,400,null,"roleNotExist",req);
    }

    req.pExist = pExist;
    req.rExist = rExist;
    next();
}