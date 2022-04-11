import { Router } from 'express';
import { changePasswordGet,changePasswordPost,forgotPassword } from '../../controllers/resetController.js';
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




accountRouter.post(	'/forgot-password',	emailValidation,validate,forgotPassword);
accountRouter.get('/reset-password/:token', changePasswordGet);
accountRouter.post('/reset-password/:token',passwordValidation,validate,changePasswordPost);

export default accountRouter;
