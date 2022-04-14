import express from 'express'
import { createUser,getAllUsers, getSingleUser, deleteUser, updateUser } from "../../controllers/userController.js"
import {  users } from "../../models"
import paginate from '../../middlewares/paginate.js';

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

router.get('/paginated', paginate(users));

/* === Start:: Create users route === */ 
    router.post('/', createUser);
/* ==== End:: Create users route === */ 
router.get('/:id', getSingleUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)

export default router