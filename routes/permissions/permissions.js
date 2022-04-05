import express from 'express'
import { getAllpermissions, createPermission } from "../../controllers/permissionsController.js"


const router = express.Router();

/** 
* @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - age
 *       properties:
 *         firstName:
 *           type: string
 *           description: First Name
 *         lastName:
 *           type: string
 *           description: Last Name
 *         age:
 *           type: string
 *           description: Age
 *       example:
 *         firstName: Funny
 *         lastName: Moon
 *         age: 25
 *        
 */


/* === Start:: list all permission route === */  
    router.get('/', getAllpermissions);
/* ==== End:: list all permission route === */ 

/* === Start:: Create permission route === */ 
    router.post('/', createPermission);
/* ==== End:: Create permission route === */ 

export default router
