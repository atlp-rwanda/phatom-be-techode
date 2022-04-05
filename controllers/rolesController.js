import { roles } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import db from "../models/index.js";
import { validateRolesOnCreate, validateRolesOnDelete } from "../function/validation.js"

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
            const { id } = req.params;
            const { error } = validateRolesOnDelete({ id });
            if(error) return fail(res,404,null,error.details[0].message) ;
            const roleExist = await roles.findAll({
                where :{ 
                    id 
                }
            });
            if(roleExist.length == 0) return fail(res,404,roleExist,"Role does not exist") ;
        /* ================================ End: validatoin ================================= */ 
        
     
        /* ======= Start:: Delete roles =================== */ 
            roles.destroy({where : {id}}).then(roles => {
                return success(res,200,roles,"Deleted");
            })
        /* ========= End:: Delete roles ================== */         
    } catch (error) {
        return sendError(res,500,null,error.message);
    }	
};


const createRole = async (req, res) => {
    try {
        /* ================== start: validatoin =================== */ 
            const { rolename } = req.body;
            const { error } = validateRolesOnCreate({ rolename });
            if(error) return fail(res,404,null,error.details[0].message) ;
            const roleExist = await roles.findAll({
                where :{ 
                    rolename 
                }
            });
            if(roleExist.length > 0) return fail(res,404,roleExist,"Role does not exist") ;
        /* ================== start: validatoin =================== */ 

        /* ========== Start: create role ================= */ 
            const createRole = await roles.create({rolename});
            return success(res,200,createRole,"Retrieved");
        /* ============ End: create role ================= */ 
    } catch (error) {
        return sendError(res,500,null,error.message);                
    }
};

export  { getAllroles, createRole, deleteRole};
