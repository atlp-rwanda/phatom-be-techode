import { roles } from "../models";
import { users } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import db from "../models/index.js";
import { validateRolesOnCreate ,validatePermissionAssignment } from "../function/validation.js"
import { permissionExist } from "./permissionsController";


const getRolesPermission = async (id = null) => {
    let query = {
        where :{ 
            id 
        }
    }
    let role = await roles.findOne(query);
    let permission = role.permissions;
    if(permission != null && permission != "" ) return permission.split(",");     
    return [];
}

const roleExist = async (id = null , rolename = null) => {
    let query = {
        where :{ 
            id 
        }
    }
    rolename != null ? query={where:{rolename}}: "";
    let exist = await roles.findAll(query);
    return exist
}

const getAllroles = async (req, res) => {
	
    /* ======= Start:: List all roles =================== */ 
        roles.findAndCountAll().then(roles => {
            return success(res,200,roles,"Retrieved");
        })
    /* ========= End:: List all roles ================== */ 
	
};

const deleteRole = async (req, res) => {	
    try {
        /* ============================ start: validatoin ================================= */ 
            const  id  = req.id;
            let exist = await roleExist(id)           
            if(exist.length == 0){
               return fail(res,400,null,"roleNotExist",req) ;
            }
        /* ================================ End: validatoin ================================= */ 
    
        /* ======= Start:: Delete roles =================== */ 
            roles.destroy({where : {id}}).then(roles => {
                return success(res,200,roles,"Deleted");
            })
        /* ========= End:: Delete roles ================== */  
    /* c8 ignore next 1 */           
    } catch (error) { return sendError(res,500,null,error.message) }	
};

const createRole = async (req, res) => {
    try {
        /* ================== start: validatoin =================== */ 
            const { rolename } = req.body;
            const { error } = validateRolesOnCreate({ rolename });
            if(error) {
                return fail(res,400,null,error.details[0].message);
            }

            let exist = await roleExist(null,rolename)    
            if(exist.length > 0) {
                return fail(res,400,null,"roleNotExist",req);
            }
        /* ================== start: validatoin =================== */ 

        /* ========== Start: create role ================= */ 
            const createRole = await roles.create({rolename});
            return success(res,201,createRole,"roleHaveBeenCreated",req);
        /* ============ End: create role ================= */ 
        /* c8 ignore next 1*/
    } catch (error) { return sendError(res,500,null,error.message) }
};

const updateRole = async (req, res) => {
    try {
        /* ============================ start: validatoin ================================= */ 
            const id  = req.id;
            const { rolename } = req.body;
            
            let { error } = validateRolesOnCreate({ rolename });
            if(error) {
                return fail(res,400,null,error.details[0].message);
            }

            let exist = await roleExist(id)           
            if(exist.length == 0){
                return fail(res,400,null,"roleNotExist",req) ;
            }
        /* ================================ End: validatoin ================================= */ 
    
        /* ======= Start:: Update roles =================== */ 
            const updated = await roles.update( { rolename },{where : {id}});
            return success(res,200,{ rolename },"updated",req);
        /* ========= End:: Update roles ================== */   
        /* c8 ignore next 1*/      
    } catch (error) { return sendError(res,500,null,error.message); }	
};

const assignPermssion = async(req,res) => {
    try {
        
        const { roleid ,rExist,pExist } = req;
        

        /* ========= Start:: validate if role has already that permission ===============  */ 
        const getRole = rExist[0];
        const getPermission = pExist[0];

        let rolesPermissions  = await getRolesPermission(roleid);
        let roleHasPermssion = rolesPermissions.includes(getPermission.permission);
        if(roleHasPermssion) {
            return fail(res,400,null,"roleHasAlreadyThatPermission",req);        
        }

        /* ========================== Start:: update role   ================================  */
        let currentRolePerimssions = getRole.permissions != null ? getRole.permissions : "";
        let newRolePermissions = currentRolePerimssions;
        if(currentRolePerimssions != "") newRolePermissions += ",";
        
        newRolePermissions += getPermission.permission;
        const updateRole = await roles.update({ permissions : newRolePermissions },{where : {id : roleid}});


        /* =============================== Start:: get roles   ====================================  */
        const getUpdateRole = await roleExist(roleid);
        return success(res,200,{ role: getUpdateRole },"permissionHasBeenAssigned",req);
        /* c8 ignore next 1*/
    } catch (error) { return sendError(res,500,null,error.message)}
}

const removePermission = async (req,res) => {
    try {

        const { roleid ,pExist } = req;


        /* =================== Start:: Validate if role exist ==================  */ 
        const permissionList = await getRolesPermission(roleid);
        let roleHasPermssion = permissionList.includes(pExist[0].permission);
        if(!roleHasPermssion){
            return fail(res,400,null,"roleDoesNotHaveThatPermission",req);
        }

    
        /* =================== Start:: Update permission list ==================  */
        let perMissionToRemove = pExist[0].permission;       
        let newPermissions = "";
        let newPermissionsList = permissionList.filter( permission => permission != perMissionToRemove);


        /* ========== Start: updating permssions string ======== */
        /* c8 ignore next 5 */ 
            const listLength = newPermissionsList.length ;
            for (let i = 0; i < listLength ; i++) {
                newPermissions += newPermissionsList[i];
                if(i != (listLength - 1)) newPermissions += ',' ;                                       
            }        
        /* ============= End: updating permssions string ====== */

        /* ========================== Start: updating permissions in database =========================== */ 
        const updateRole = await roles.update({ permissions : newPermissions },{where : {id : roleid}});    
        return success(res,200,{ permission: newPermissions },"permissionHaveBeenRemoved",req);
        /* ============================= End: updating permissions in database ============================ */
        /* c8 ignore next 1*/
    } catch (error) { return sendError(res,500,null,error.message)}
}

const assignRole = async (req,res) => {
    try {
        /* ==================== Start:: validation ========================  */ 
            const { userId, roleId } = req.body;
            const { error } = validatePermissionAssignment({userId , roleId});
            if(error) {
                return fail(res,400,null,error.details[0].message);
            }

        /* =============== Start:: validate if user exist ==================  */ 
            const user = await users.findAll({where: { id:userId }});
            let userExist = user.length;
            if(!userExist) {
                return fail(res,400,null,"userNotExist",req);
            }

        /* =============== Start:: validate if role exist ==================  */ 
            const role = await roleExist(roleId);
            let exist =  role.length;
            if(!exist) {
                return fail(res,400,null,"roleNotExist",req);
            }
        /* =============== Start:: validate if role exist ==================  */
            exist =  user[0].roleId ==  roleId;
            if(exist) {
                return fail(res,400,null,"roleAlreadyAssigned",req);    
            }            

        /* ========================= Start:: Updating the user role ==================  */ 
            await users.update({roleId},{where:{ id : userId }});
            const getUsers = await users.findAndCountAll({attributes: {exclude: ['password']},where: { id : userId }});
            return success(res,200,{ user: getUsers },"roleUpdated",req);
        /* ========================== Emd:: Updating the user role ==================  */ 
        /* c8 ignore next 1*/
    } catch (error) { return sendError(res,500,null,error.message); }
}

const removeRole = async (req,res) => {
    try {
        /* ==================== Start:: validation ========================  */ 
            const { userId, roleId } = req.body;
            const { error } = validatePermissionAssignment({userId , roleId});
            if(error)  {
                return fail(res,400,null,error.details[0].message);
            }
        /* =============== Start:: validate if user exist ==================  */ 
            const user = await users.findAll({where: { id:userId }});
            let userExist = user.length;
            if(!userExist) {
                return fail(res,400,null,"userNotExist",req);
            }

        /* =============== Start:: validate if role exist ==================  */ 
            const role = await roleExist(roleId);
            let exist =  role.length;
            if(!exist) {
                return fail(res,400,null,"roleNotExist",req);
            }

        /* =============== Start:: validate if role exist on that users ==================  */
            exist =  user[0].roleId ==  roleId;
            if(!exist) {
                return fail(res,400,null,"userDoesNotHaveThisRole",req);    
            }

        /* ========================= Start:: Updating the user role ==================  */ 
            await users.update({roleId : null},{where:{ id : userId }});
            const getUsers = await users.findAndCountAll({attributes: {exclude: ['password']},where: { id : userId }});
            return success(res,200,{ user: getUsers },"roleUpdated",req);
        /* ========================== Emd:: Updating the user role ==================  */ 
        /* c8 ignore next 1*/
    } catch (error) { return sendError(res,500,null,error.message)}
}

export  { getAllroles, createRole,updateRole , deleteRole , assignPermssion, removePermission, assignRole, roleExist , getRolesPermission, removeRole};