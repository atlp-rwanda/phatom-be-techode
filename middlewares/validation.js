import validator from 'validator';
import { success, fail, sendError } from "../function/respond.js";

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

export { validInput, validLogin }