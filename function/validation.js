import Joi from "joi";
/* ========= Start: Delete role request validation ============== */ 
export const  validateRolesOnDelete  = (data) => {
    const schema = Joi.object({
        id: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= Start: Delete role request validation ============== */ 

/* ========= Start: Create role request validation ============== */ 
export const  validateRolesOnCreate  = (data) => {
    const schema = Joi.object({
        rolename: Joi.string().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= Start: Create role request validation ============== */ 