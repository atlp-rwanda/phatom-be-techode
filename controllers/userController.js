import User from "../models/user.js";
import { success,fail,sendError } from "../function/respond.js"

const getAllUsers = async (req, res) => {
    const users = await User.find();
	return success(res,200,users,"Retrieved");

};

const createUser = async (req, res) => {
    try {
		const newUser = User.create(req.body);
		await newUser.save();
		const {fullname,username} = newUser;
		return success(res,201,{fullname,username},"New user have been created");
	} catch (error) {
		return sendError(res,400,null,error.message);
	}
};

export  { getAllUsers, createUser };
