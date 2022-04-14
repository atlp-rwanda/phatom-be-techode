import validator from 'validator';
import { success, fail, sendError } from "../function/respond.js";
import { validateId, validateUsersOnCreate, validateBusOnAssign } from "../function/validation"

const validInput = async (req, res, next) => {
  const { fullname, username, password , email } = req.body;
  if (!validator.isEmail(email)) {
    return fail(res, 400, null, "invalid email address");
  }
  if (!username) {
    return fail(res, 401, null, "username is required");
  }
  if (!fullname) {
    return fail(res, 400, null, "fullname is required");
  }
  if (!password) {
    return fail(res, 401, null, "password is required");
  }  
  next();
};

const validLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return fail(res, 401, null, "requiredEmail",req);
  }
  if (!password) {
    return fail(res, 401, null, "requiredPassword",req);
  }
  next();
};

const validId = async (req, res, next) => {
  const { id } = req.params;
  const { error } = validateId({ id })
  if(error) return fail(res,400, {error: null}, error.details[0].message)
  next();
}
const validCreate = (req, res, next) => {
  const { firstname, lastname, username, email, telephone, userType } = req.body
		const { error } = validateUsersOnCreate({firstname:firstname, lastname:lastname, username:username, email:email, telephone:telephone, userType:userType})
		if(error)	return fail(res, 400, {error: null}, error.details[0].message)
    next();
}

 const validAssign = (req, res, next) => {
   const { userId, busId } = req.body
   const { error } = validateBusOnAssign({ userId, busId })
  if(error) return fail(res,400, {error: null}, error.details[0].message)
  next();
 }

export { validInput, validLogin, validId, validCreate, validAssign }