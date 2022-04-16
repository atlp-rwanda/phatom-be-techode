import { permissions } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import db from "../models/index.js";
import { paginate } from "../utils/paginate";


const permissionExist = async (id = null , permissionname = null) => {
    let query = {
        where :{ 
            id:id 
        }
    }
    /* c8 ignore next 1 */ 
    permissionname != null ? query={where:{permission_name:permissionname}}: "";
    let exist = await permissions.findAll(query);
    return exist
}

const getAllpermissions = async (req, res) => {
	
     try {
        const dataPage = req.query.page;
        const dataSize = req.query.size;
        const { page , size } = paginate(dataPage,dataSize);
        /* ======= Start:: List all permissions =================== */ 
            permissions.findAndCountAll({ limit : size , offset: page * size }).then(permission => {
                return success(res,200,{ permission : permission.rows , totalPage : Math.ceil(permission.count / size) },"Retrieved");
            })
        /* ========= End:: List all permissions ================== */ 
     /* c8 ignore next 1 */ 
     } catch (error) {  return sendError(res,500,null,error.message)}
   
        
   
	
};


export  { getAllpermissions , permissionExist };
