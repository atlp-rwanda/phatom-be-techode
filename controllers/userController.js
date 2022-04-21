import { users, buses } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import sendMail from '../utils/sendEmail'
import Sequelize from "sequelize"
import { validateDriversOnCreate, validateDriverId } from '../function/validation'
import generator from 'generate-password'
import bcrypt from 'bcrypt'

const { Op } = Sequelize
const passwordNew = generator.generate({
	length: 10,
	numbers: true
});

const getAllUsers = async (req, res) => {
	/* ======= Start:: List all users =================== */ 
		users.findAndCountAll({attributes: {exclude: ['password']}}).then(users => {				
			return success(res,200,users,"Retrieved");
		})
	/* ========= End:: List all users ================== */ 	
};

const createUser = async (req, res) => {
		
		const hashedPassword = await bcrypt.hash(passwordNew, 10)

	    /* =============================== start: Validation ============================== */ 
		const { firstname, lastname, username, email, telephone, userType } = req.body
		const { error } = validateDriversOnCreate({firstname:firstname, lastname:lastname, username:username, email:email, telephone:telephone, userType:userType})
		if(error) { 
			return fail(res, 422, error.details[0].message)
		}
		const userExist = await users.findAll({
			where :{ 
				email:email
			}
		});
		if(userExist.length > 0){
			return fail(res,409,null,'userExist',req)
		}
		/* =========== start: User creation ================ */ 
		users.create({
			fullname: req.body.firstname + ' ' + req.body.lastname,
			username: req.body.username, 
			email: req.body.email,
			telephone: req.body.telephone,
			userType: req.body.userType,
			password: hashedPassword
		}).then( user => {
			return success(res,201,{username,userType},"New user have been created", req)
		}).catch(err => { return sendError(res,500,err,err.message,req) })
		/* =========== start: User creation ============== */ 

};

const getSingleUser = async(req, res) => {
    try{
        let { id } = req.params
        const { error } = validateDriverId({id})
        if(error){
            return fail(res,422,null,error.details[0].message) 
        }
        const userExist = await users.findAll({
            where :{ 
                id 
            }
        });
    if(userExist.length == 0){
        return fail(res,404,userExist,'userNotFound',req)
    }
        users.findByPk(id).then((driver)=> {
            return success(res,200,driver,'Single user',req)
        })
        /* c8 ignore next 1*/
    } catch(error){return sendError(res,500,null,error.message, req)}
}

const deleteUser = async(req, res) => {
    let { id } = req.params
    const { error } = validateDriverId({id})
    if(error) {
        return fail(res,422,null,error.details[0].message) 
    }
    const userExist = await users.findAll({
        where :{ 
            id 
        }
    });
    if(userExist.length == 0){
        return fail(res,404,userExist,'userNotFound',req)
    }
    try{
        users.findByPk(id).then((user)=> {
            user.destroy()
            return success(res,204,user,"user deleted", req)
        })
        /* c8 ignore next 1*/
    } catch(error){ return sendError(res,500,null,error.message) }
}

const updateUser = async(req, res) => {
    try {
        let { id } = req.params
        const { error } = validateDriverId({id})
        if(error){
            return fail(res,422,null,error.details[0].message) 
        }
        const userExist = await users.findAll({
            where :{ 
                id 
            }
        });
        if(userExist.length == 0){
            return fail(res,404,userExist,'userNotFound',req)
        }
        users.findByPk(id).then((user) => {
            user.update({
                fullname: req.body.firstname + ' ' +  req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                telephone: req.body.telephone,
            })
            return success(res,200,user,'userUpdated',req)
        })
        /* c8 ignore next 1*/
    } catch(error){ return sendError(res,500,null,error.message) }
}

export  { 
	getAllUsers, 
	createUser, 
	getSingleUser, 
	deleteUser, 
	updateUser,
 };
