import Joi from "joi";

/* ========= Start: Create role request validation ============== */ 
export const  validateRolesOnCreate  = (data) => {
    const schema = Joi.object({
        rolename: Joi.string().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= Start: Create role request validation ============== */ 

/* ========= Start: Create route validation ============== */ 
export const  validateRoutesOnCreate  = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        code: Joi.string().required(),
        city: Joi.string().required(),
        startLocation: Joi.string().required(),
        endLocation: Joi.string().required(),
        duration: Joi.number().required(),
        distance: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
/* ========= Start: Create route request validation ============== */ 

export const  validateUsersOnCreate  = (data) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        telephone: Joi.string().required().min(10),
        userType: Joi.string().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}

export const  validatePermissionAssignment  = (data) => {
    const schema = Joi.object({
        roleId: Joi.number().required(),
        userId: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}

export const validateBusInput = ( data ) => {
    /* c8 ignore next 11 */
    const schema = Joi.object({
        bustype: Joi.string().required().min(5),
        routecode: Joi.number().required().min(3),
        platenumber:Joi.string().required().min(5)
    })

    const value = schema.validate(data , { abortEarly: false });
    return value
}

export const  validateId = (data) => {
    const schema = Joi.object({
        id: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}

/* c8 ignore next 7 */
export const  validateAction = (data) => {
    const schema = Joi.object({
        action: Joi.string().required().min(4)
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}

export const validateBusOnAssign = (data) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        busId: Joi.number().required()
    });

    const value = schema.validate(data , { abortEarly: false });
    return value
}
