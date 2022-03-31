import express from 'express'
<<<<<<< HEAD
import { createUser,getAllUsers } from "../../controllers/userController.js"
=======
import userController from "../../controllers/userController.js"
>>>>>>> chore(config): configure continous integration


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


/* === Start:: list all users route === */ 
    router.get('/', getAllUsers);
/* ==== End:: list all users route === */ 

/* === Start:: Create users route === */ 
    router.post('/', createUser);
/* ==== End:: Create users route === */ 

export default router
