import Joi from "joi";
/* ========= Start: Delete role request validation ============== */ 
export const  validateDriverId  = (data) => {
    const schema = Joi.object({
        id: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= Start: Delete role request validation ============== */ 

/* ========= Start: Create role request validation ============== */ 
export const  validateDriversOnCreate  = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        telephone: Joi.string().required().min(10),
        userType: Joi.string().required(),
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= Start: Create role request validation ============== */ 
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
/* ========= End: Create driver request validation ============== */ 

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