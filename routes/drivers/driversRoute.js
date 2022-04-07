import express from 'express'
import { addDriver,allDrivers, getSingleDriver, deleteDriver, updateDriver } from '../../controllers/driversController'

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     drivers:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - telephone
 *       properties:
 *         firstname:
 *           type: string
 *           description: firstname of the driver 
 *         lastname:
 *           type: string
 *           description: lastname of the driver 
 *         email:
 *           type: string
 *           description: email of the driver 
 *         telephone:
 *           type: string
 *           description: telephone of the driver
 *       example:
 *         firstname: John
 *         lastname: Doe  
 *         email: name@gmail.com
 *         telephone: 078699866
 */

/**
 * @swagger
 * /api/v1/drivers/register:
 *  post:
 *    tags:
 *    - "Drivers"
 *    summary: Create a Driver 
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
 *                 description: The driver's firstname.
 *                 example: John   
 *               lastname:
 *                 type: string
 *                 description: The driver's lastnaname.
 *                 example: doe      
 *               email:
 *                 type: string
 *                 description: The driver's email.
 *                 example: test@domain.com
 *               telephone:
 *                 type: string
 *                 description: The driver's telephone.
 *                 example: 078697877
 *    responses:
 *      '201':
 *        description: A new driver created successfully!
 *      '422':
 *        description: All fields are required required!
 *      '409':
 *        description: Conflict driver already exists
 *      '500':
 *        description: Internal server error
*/
router.post('/register', addDriver)
/**
 * @swagger
 * /api/v1/drivers:
 *   get:
 *     summary: Getting all drivers
 *     tags: [Drivers]
 *     responses:
 *       200:
 *         description: All available drivers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drivers'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/  
router.get('/', allDrivers)
/**
 * @swagger
 * /api/v1/drivers/{id}:
 *   get:
 *     summary: Get the driver by id
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 *     responses:
 *       200:
 *         description: The Driver description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/drivers'
 *       404:
 *         description: The Driver was not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getSingleDriver)
/**
 * @swagger
 * /api/v1/drivers/{id}:
 *   delete:
 *     summary: Remove the driver by id
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id
 * 
 *     responses:
 *       200:
 *         description: The driver was deleted
 *       404:
 *         description: The driver was not found
 *       500:
 *        description: Internal server error
 */
router.delete('/:id', deleteDriver)
/**
 * @swagger
 * /api/v1/drivers/{id}:
 *  put:
 *    summary: Update the driver information
 *    tags: [Drivers]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The driver id 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/drivers'
 *    responses:
 *      200:
 *        description: driver updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/drivers'
 *      404:
 *        description: driver not found
 *      500:
 *        description: Internal server error
 */
router.put('/:id', updateDriver)

export default router