import express from 'express'
import { createUser,getAllUsers } from "../../controllers/userController.js"


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


<<<<<<< HEAD
router.post('/', userController.postUser);

router.post('/', userController.forgot);
=======
/* === Start:: list all users route === */ 
    router.get('/', getAllUsers);
/* ==== End:: list all users route === */ 

/* === Start:: Create users route === */ 
    router.post('/', createUser);
/* ==== End:: Create users route === */ 

>>>>>>> 0df830c1bd425a7916c31f3a3dac6b367766d22c
export default router
