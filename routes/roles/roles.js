import express from 'express'
import  { getAllroles, createRole , deleteRole } from "../../controllers/rolesController.js"


const router = express.Router();

/** 
* @swagger
 * components:
 *   schemas:
 *     Roles:
 *       type: object
 *       required:
 *         - rolename
 *         - permssionId
 *       properties:
 *         firstName:
 *           type: string
 *           description: Role name
 *         permssionId:
 *           type: integer
 *           description: permission id 
 *       example:
 *         rolename: Admin
 *         permissionId: 1        
 */


/* === Start:: list all roles  === */  
    router.get('/', getAllroles);
/* ==== End:: list all roles  ==== */ 

/* === Start:: Create roles  ===== */ 
    router.post('/', createRole);
/* ==== End:: Create roles  ====== */ 

/* === Start:: Delete roles  ===== */ 
    router.delete('/:id', deleteRole);
/* ==== End:: Delete roles  ====== */ 

export default router
