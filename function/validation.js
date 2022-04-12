import Joi from "joi";
/* ========= Start: Delete role request validation ============== */ 
export const  validateRolesOnDelete  = (data) => {
    const schema = Joi.object({
        id: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= End: Delete role request validation ============== */ 

/* ========= Start: Create role request validation ============== */ 
export const  validateRolesOnCreate  = (data) => {
    const schema = Joi.object({
        rolename: Joi.string().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= End: Create role request validation ============== */ 

/* ========= Start: Assign Permissions validation ============== */ 
export const  validateRolesOnAssign  = (data) => {
    const schema = Joi.object({
        roleid: Joi.number().required(),
        permissionid: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= End: Assign Permissions validation ============== */ 

/* ========= Start: Assign Permissions validation ============== */ 
export const  validatePermissionAssignment  = (data) => {
    const schema = Joi.object({
        roleId: Joi.number().required(),
        userId: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= End: Assign Permissions validation ============== */ 