import { permissions } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import db from "../models/index.js";


const getAllpermissions = async (req, res) => {
	
    /* ======= Start:: List all permissions =================== */ 
        permissions.findAndCountAll().then(permissions => {
            return success(res,200,permissions,"Retrieved");
        })
    /* ========= End:: List all permissions ================== */ 
	
};

const createPermission = async (req, res) => {
 
};

export  { getAllpermissions, createPermission };
