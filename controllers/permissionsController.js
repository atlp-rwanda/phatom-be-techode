import { permissions } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import db from "../models/index.js";


const permissionExist = async (id = null , permissionname = null) => {
    let query = {
        where :{ 
            id:id 
        }
    }
    permissionname != null ? query={where:{permission_name:permissionname}}: "";
    let exist = await permissions.findAll(query);
    return exist
}

const getAllpermissions = async (req, res) => {
	

    /* ======= Start:: List all permissions =================== */ 
        permissions.findAndCountAll().then(permission => {
            return success(res,200,permission,"Retrieved");
        })
    /* ========= End:: List all permissions ================== */ 
        
   
	
};


export  { getAllpermissions , permissionExist };
