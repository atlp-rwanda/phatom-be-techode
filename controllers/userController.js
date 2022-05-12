import { users, buses, operators, drivers } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import generator from 'generate-password'
import bcrypt from 'bcrypt'
import sendEmail from '../utils/resetUtil';
import { hashPassword, jwtToken } from '../middlewares/auth'


const getAllUsers = async (req, res) => {
	/* ======= Start:: List all users =================== */ 
		users.findAll({attributes: {exclude: ['password']}}).then(users => {				
			return success(res,200,{users:users},"Retrieved");
		})
	/* ========= End:: List all users ================== */ 	
};

const createUser = async (req, res) => {
    const passwordNew = generator.generate({
        length: 11,
        numbers: true
    });    
		
    const hashedPassword = hashPassword(passwordNew)
    /* =============================== start: Validation ============================== */ 
    const { firstname, lastname, username, email, telephone, userType } = req.body
    const userExist = await users.findOne({ where: { email : email , isDeleted: false }});
    if(userExist){
    	return fail(res,409,{user:null},'userExist',req)
    }
    
    
    /* =========== start: User creation ================ */ 
    users.create({
    	fullname: firstname + ' ' + lastname,
    	username: username, 
    	email: email,
    	telephone: telephone,
    	userType: userType,
    	password: hashedPassword
    }).then( async (user)=> {
        if(user.userType == 'driver' || user.userType == 'Driver'){
            drivers.create({ userId: user.id})
        }
        /* c8 ignore next 4 */
        if(user.userType == 'operator' || user.userType == 'Operator'){
            operators.create({ userId: user.id})
        }

        await sendEmail(`${ req.t('pwdMsg')+" "+passwordNew}`, user.email, null ,req.t('emailMessage'));
    	return success(res,201,{username,userType},"New user have been created", req)
    }).catch(err => { return sendError(res,500,err,err.message,req) })
    /* =========== start: User creation ============== */ 

};

const getSingleUser = async(req, res) => {
    try{
        let { id } = req.params
        const userExist = await users.findOne({
            where :{ 
                id: id,
                isDeleted: false 
            }
        });
    if(!userExist){
        return fail(res,404,{user:userExist},'userNotFound',req)
    }
        await users.findByPk(id).then((user)=> {
            const { fullname,username, userType} = user
            /* c8 ignore next 5*/
            if(userType == 'Operator' || userType == 'operator'){
                operators.findAll({where: {userId: id}, attributes:{exclude: ['createdAt', 'updatedAt']}}).then( operator => {
                    return success(res,200,{fullname,username, operator},'Single user',req)
                })
            }
            if(userType == 'Driver' || userType == 'driver'){
                drivers.findAll({where: {userId: id}, include: buses, attributes:{exclude: ['createdAt', 'updatedAt']}}).then( driver => {
                    return success(res,200,{fullname,username, driver},'Single user',req)
                })
            }
            if(userType == null){
                return success(res,200,{fullname,username},'Single user',req)
            }
        })
        /* c8 ignore next 1*/
    } catch(error){return sendError(res,500,null,error.message, req)}
}

const deleteUser = async(req, res) => {
    let { id } = req.params
    const userExist = await users.findOne({
        where :{ 
            id 
        }
    });
    if(!userExist){
        return fail(res,404,{user:userExist},'userNotFound',req)
    }
    try{
        users.findByPk(id).then((user)=> {
            const { id,username} = user
            user.update({
                isDeleted: true
            })
            return success(res,200,{id, username},"user deleted", req)
        })
        /* c8 ignore next 1*/
    } catch(error){ return sendError(res,500,null,error.message) }
}

const updateUser = async(req, res) => {
    try {
        let { id } = req.params
        const userExist = await users.findOne({
            where :{ 
                id 
            }
        });
        if(!userExist){
            return fail(res,404,{user:userExist},'userNotFound',req)
        }
        users.findByPk(id).then((user) => {
<<<<<<< HEAD
            const { id, username, telephone, email, lastname, firstname} = req.body
=======
            const { id, username, telephone, email, lastname, firstname} = user
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
            user.update({
                fullname: firstname + ' ' + lastname,
                username:username,
                email:email,
                telephone:telephone,
            })
            return success(res,200,{id, username},'userUpdated',req)
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
