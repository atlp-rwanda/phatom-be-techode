import { users } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import db from "../models/index.js";


const getAllUsers = async (req, res) => {
	/* ======= Start:: List all users =================== */ 
		users.findAndCountAll({attributes: {exclude: ['password']}}).then(users => {				
			return success(res,200,users,"Retrieved");
		})
	/* ========= End:: List all users ================== */ 	
};

const createUser = async (req, res) => {
    try {

	    /* =============================== start: Validation ============================== */ 
			if(!req.body.username && !req.body.password &&  !req.body.fullname && !req.body.email && !req.body.profileImage) throw new Error('Body is required');				
			if(!req.body.password || req.body.password.trim() === "") return fail(res,400,req.body,"Please make sure you add password");
		/* ================================= End: Validation ============================== */ 
		
		/* =========== start: User creation ================ */ 
			const newUser = users.create(req.body);
			const {fullname,username,email,profileImage} = req.body;
			return success(res,201,{fullname,username,email,profileImage},"New user have been created");
		/* =========== start: User creation ============== */ 
	} catch (error) {
		return sendError(res,500,null,error.message);
	}
};

export  { getAllUsers, createUser };
