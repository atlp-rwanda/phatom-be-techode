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
=======
<<<<<<< HEAD
router.get('/', userController.getUsers);
=======

/* === Start:: list all users route === */ 
    router.get('/', getAllUsers);
/* ==== End:: list all users route === */ 

/* === Start:: Create users route === */ 
    router.post('/', createUser);
/* ==== End:: Create users route === */ 
>>>>>>> ch(Postgres) postgres setup
>>>>>>> ch(Postgres) postgres setup

/* === Start:: list all users route === */ 
    router.get('/', getAllUsers);
/* ==== End:: list all users route === */ 

/* === Start:: Create users route === */ 
    router.post('/', createUser);
/* ==== End:: Create users route === */ 

export default router
