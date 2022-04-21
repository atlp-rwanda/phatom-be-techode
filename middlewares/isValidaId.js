import { fail } from "../function/respond";
import { validateId } from "../function/validation";

const isValidaId = (req,res,next) =>{
    const { id } = req.params;
    const { error } = validateId({ id });
    if(error) return fail(res,400, null , error.details[0].message);
    req.id = id;
    next()
}

export const validatePidRid =(req,res,next) => {
    
    const { roleid , permissionid } = req.body;
    const roleIdHasError = validateId({ id: roleid }).error;
    const permssionIdHasError = validateId({ id: permissionid }).error;
   
    if(roleIdHasError) {
        return fail(res,400,null,roleIdHasError.details[0].message);
    }
    if(permssionIdHasError) {
        return fail(res,400,null,permssionIdHasError.details[0].message);
    }
    req.roleid = roleid;
    req.permissionid = permissionid;
    next();
}

export default isValidaId;