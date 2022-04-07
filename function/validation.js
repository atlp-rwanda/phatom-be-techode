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
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        telephone: Joi.string().required().min(10)
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= Start: Create role request validation ============== */ 
