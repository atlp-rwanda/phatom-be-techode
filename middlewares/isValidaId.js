import { validateId } from "../function/validation";

const isValidaId = (req,res,next) =>{
    const { id } = req.params;
    const { error } = validateId({ id });
    if(error) return fail(res,400, null , error.details[0].message);
    req.id = id;
    next()
}

export default isValidaId;