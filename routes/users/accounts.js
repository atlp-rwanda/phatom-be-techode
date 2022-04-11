import { Router } from 'express';
import { validateToken,changePasswordPost,forgotPassword } from '../../controllers/resetController.js';
import { emailValidation,passwordValidation,validate } from '../../controllers/resetUtil.js';

const accountRouter = Router();




/**
 * @swagger
 * tags:
 *  name: Reset
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    sendingEmail:
 *      type: object
 *      required:
 *        - email
 *      example:
 *        email: delyce@gmail.com
 *      properties:
 *        email:
 *          type: string
 *          description: valid email address
 * 
 */





/**
 * @swagger
 * /api/v1/accounts/forgot-password/:
 *  post:
 *    summary: reset password
 *    tags:
 *      - Reset
 *    description: fill in your email
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/sendingEmail"
 *    responses:
 *      200:
 *        description: check your email
 * 
 */




accountRouter.post('/forgot-password',	forgotPassword);
accountRouter.get('/reset-password/:token', validateToken);



/**
 * @swagger
 * tags:
 *  name: Reset
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    sendingPassword:
 *      type: object
 *      required:
 *        - password
 *      example:
 *        password: delyce@123
 *      properties:
 *        email:
 *          type: string
 *          description: astrng password is required
 * 
 */





/**
 * @swagger
 * /api/v1/accounts/reset-password/{token}:
 *  post:
 *    summary: reset password
 *    tags:
 *      - Reset
 *    description: fill in your email
 *    parameters:
 *      - name: token
 *        in: param
 *        description: 
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/sendingPassword"
 *    responses:
 *      200:
 *        description: check your email
 * 
 */




accountRouter.post('/reset-password/:token',changePasswordPost);

export default accountRouter;
