import express from 'express'
import { addOperator, allOperators, getSingleOperator, deleteOperator, updateOperator } from '../../controllers/operatorsController'

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     operators:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - telephone
 *       properties:
 *         firstname:
 *           type: string
 *           description: firstname of the operator 
 *         lastname:
 *           type: string
 *           description: lastname of the operator 
 *         email:
 *           type: string
 *           description: email of the operator 
 *         telephone:
 *           type: string
 *           description: telephone of the operator
 *       example:
 *         firstname: John
 *         lastname: Doe  
 *         email: name@gmail.com
 *         telephone: 078699866
 */

/**
 * @swagger
 * /api/v1/operators/register:
 *  post:
 *    tags:
 *    - "Operators"
 *    summary: Create an Operator 
 *    description: Fill inforamation in email, firstname, lastname and telephone
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: The operators's firstname.
 *                 example: John   
 *               lastname:
 *                 type: string
 *                 description: The operators's lastnaname.
 *                 example: doe      
 *               email:
 *                 type: string
 *                 description: The operator's email.
 *                 example: test@domain.com
 *               telephone:
 *                 type: string
 *                 description: The operator's telephone.
 *                 example: 078697877
 *    responses:
 *      '201':
 *        description: A new operator created successfully!
 *      '422':
 *        description: All fields are required required!
 *      '409':
 *        description: Conflict operator already exists
 *      '500':
 *        description: Internal server error
*/
router.post('/register', addOperator)
/**
 * @swagger
 * /api/v1/operators:
 *   get:
 *     summary: Getting all operators
 *     tags: [Operators]
 *     responses:
 *       200:
 *         description: All available operators
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/operators'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/  
router.get('/', allOperators)
/**
 * @swagger
 * /api/v1/operators/{id}:
 *   get:
 *     summary: Get the operator by id
 *     tags: [Operators]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The operator id
 *     responses:
 *       200:
 *         description: The Operator description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/operators'
 *       404:
 *         description: The Operator was not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getSingleOperator)
/**
 * @swagger
 * /api/v1/operators/{id}:
 *   delete:
 *     summary: Remove the operator by id
 *     tags: [Operators]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The operator id
 * 
 *     responses:
 *       200:
 *         description: The operator was deleted
 *       404:
 *         description: The operator was not found
 *       500:
 *        description: Internal server error
 */
router.delete('/:id', deleteOperator)
/**
 * @swagger
 * /api/v1/operators/{id}:
 *  put:
 *    summary: Update the operator information
 *    tags: [Operators]
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
 *            $ref: '#/components/schemas/operators'
 *    responses:
 *      200:
 *        description: operator updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/operators'
 *      404:
 *        description: operator not found
 *      500:
 *        description: Internal server error
 */
router.put('/:id', updateOperator)

export default router