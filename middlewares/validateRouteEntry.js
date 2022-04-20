import { route } from '../models';
import { fail } from "../function/respond";
import {
	validateRoutesOnCreate,
} from '../function/validation';

const isValidRouteEntry = (req,res,next) =>{
    const { name, code, city, startLocation, endLocation, duration, distance } = req.body;
    const { error } = validateRoutesOnCreate({name: name, code: code, city: city, startLocation: startLocation, endLocation: endLocation, duration: duration, distance: distance })
    if(error) return fail(res,422, null , error.details[0].message);
    // req.id = id;

 

    next()
}

export default isValidRouteEntry;