import express from 'express'
import { updateProfile } from "../../controllers/profileContoller.js"
import { checkAuth, isLoggedIn } from '../../middlewares/checkAuthorization.js'


const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     profiles:
 *       type: object
 *       required:
 *         - profileImage
 *       properties:
 *         profileImage:
 *           type: string
 *           description: profile image of operator || driver
 *       example:
 *         profileImage: "https://cdn.pixabay.com/photo/2022/04/06/13/58/woman-7115624__340.jpg"
 */

/**
 * @swagger
 * /api/v1/profile:
 *  put:
 *    summary: Update the driver || operator information
 *    tags: [profiles]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The operator id 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/profiles'
 *    responses:
 *      200:
 *        description: operator || driver updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/profiles'
 *      404:
 *        description: something went wrong
 *      500:
 *        description: Internal server error
 */
/* ==== Start:: update user profile === */ 
	router.put('/', isLoggedIn, checkAuth, updateProfile);
    
/* ==== End:: update user profile === */ 

export default router