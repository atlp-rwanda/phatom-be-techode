import express from 'express'
import { signUp, signIn } from "../controllers/authsController.js"
import validateAuth from '../middleware/validation'


const router = express.Router();

/* === Start:: register user === */ 
router.post('/register', validateAuth, signUp);
/* ==== End:: register user === */ 

/* === Start:: login route === */

// Login endpoint documentation
// Login Schema
/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */
/**
// Documentation
/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Login API
 *     summary: Phantom Login API
 *     description: This is the login API where a registered user should be able to login into Phantom.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: login
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: User successfully Logged in and the token was generated
 */

// End-point for user to login
 
router.post('/login', signIn);
/* ==== End:: login route === */ 

export default router