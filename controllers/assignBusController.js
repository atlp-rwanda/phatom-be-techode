import { users, buses, drivers } from "../models";
import { sendError ,success,fail } from "../function/respond.js";
import sendEmail from '../utils/resetUtil';

const assignBus = async (req, res) => {
	try {
        const { userId, busId } = req.body
       	const user = await users.findOne({where : {id : userId, userType:['Driver', 'driver'], isDeleted: false}})
    
        if(!user) {
            return fail(res, 404,null, "userNotExist", req)
        }
        const bus = await buses.findOne({where : {id : busId}})
        if(!bus){
            /* c8 ignore next 2*/
            return fail(res, 404,null, "busNotExist", req)
        }
        const busExist = await drivers.findOne({where : {busId}})
        if(busExist){
            let driver = await users.findOne({where : {id: userId}, attributes:{exclude: ['password','createdAt', 'updatedAt', 'roles', 'isDeleted', 'roleId']}})
            return fail(res, 409,driver, "busAssigned", req)
        }
        await drivers.update({busId: busId}, {where: { userId : userId }}).then(async (driver) => {
            await sendEmail(`${user.fullname}`, user.email, null ,req.t('assignedBus'));
            
        /* c8 ignore next 1*/
        return success(res,200, {username: user.username} ,"bus assigned successfully",req)
        })
	} catch (error) { return sendError(res,500,null,error.message) }
}

 
export { assignBus } 