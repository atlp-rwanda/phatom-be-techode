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
        const { page:dataPage, size:dataSize , order:orderBy } = req.query;
        const { page , size , order } = paginate(dataPage,dataSize,orderBy);
        /* ======= Start:: List all permissions =================== */ 
            permissions.findAndCountAll({ 
                limit : size ,
                offset: page * size ,
                order: [
                        ["id", order]
                    ]
                }).then(permission => {
                return success(res,200,{ permission : permission.rows , totalPage : Math.ceil(permission.count / size) },"Retrieved");
            })
        /* ========= End:: List all permissions ================== */ 
     /* c8 ignore next 1 */ 
     } catch (error) {  return sendError(res,500,null,error.message)}
   
        
   
	
};

const getSinglePermision = async (req, res) => {
	
    try {
        const query = req.params.permission;
        if(!query){
            return fail(res,400,null,"badRequest",req)
        }
        const data = await permissions.findOne({where:{permission : query}});
        if(!data){
            return fail(res,400,null,"permissionNotFound",req)
        }
        return success(res,200,{ permission : data },"Retrieved");
       /* ========= End:: List all permissions ================== */ 
    /* c8 ignore next 1 */ 
    } catch (error) {  return sendError(res,500,null,error.message)}
};



export  { getAllpermissions , permissionExist , getSinglePermision };
