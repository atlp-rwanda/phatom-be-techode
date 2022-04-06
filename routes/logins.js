import express from 'express'
import { signUp, signIn } from "../controllers/authsController.js"
import { validInput, validLogin } from '../middleware/validation'


const router = express.Router();

/* === Start:: register user === */ 
router.post('/register', validInput, signUp);
/* ==== End:: register user === */ 

// Login endpoint documentation
// Login Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User's Email
 *         password:
 *           type: string
 *           description: User's Password
 */


// Documentation
/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: This is the login API where a registered user should be able to login into Phantom Web app
 *     tags: [Login API]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       500:
 *         description: Some server error
 */
 
router.post('/', validLogin, signIn);
/* ==== End:: login route === */ 

export default router