import express from 'express'
import { addBus,getAllBuses,getSingleBus,deleteBus, updateBus} from '../../controllers/busesController'
import { checkAuth, isLoggedIn } from '../../middlewares/checkAuthorization'
import isValidaId from '../../middlewares/isValidaId'

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *     buses:
 *       type: object
 *       required:
 *         - busetype
 *         - routecode
 *         - platenumber
 *       properties:
 *         busetype:
 *           type: string
 *           description: busetype of the buses 
 *         routecode:
 *           type: string
 *           description: routecode of the buses 
 *         platenumber:
 *           type: string
 *           description: platenumber of the buses 
 *       example:
 *         busetype: Couster
 *         routecode: 401  
 *         platenumber: RAE000X
 *     response: 
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        data:
 *          type: null
 *        message:
 *          type: string  
 */

/**
 * @swagger
 * /api/v1/buses/register:
 *  post:
 *    tags:
 *    - "Buses"
 *    summary: Create a buses 
 *    description: Fill inforamation route code , plate number , route code
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bustype:
 *                 type: string
 *                 description: The buses's typr.
 *                 example: Couster   
 *               platenumber:
 *                 type: string
 *                 description: The buses's plate number.
 *                 example: RAD0000Z      
 *               routecode:
 *                 type: string
 *                 description: The buses's route code.
 *                 example: 401
 *    responses:
 *      '201':
 *        description: A new buses created successfully!
 *        content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *      '400':
 *        content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *             schema: 
 *               $ref: "#/components/schemas/response"
*/
router.post('/register',isLoggedIn ,checkAuth, addBus)
/**
 * @swagger
 * /api/v1/buses:
 *   get:
 *     summary: Getting all buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: All available buses
 *         content:
 *            application/json:
 *               schema: 
 *                 $ref: "#/components/schemas/response"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *       401:
 *         description: Unauthorized  
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response" 
*/  
router.get('/', getAllBuses)
/**
 * @swagger
 * /api/v1/buses/{id}:
 *   get:
 *     summary: Get the buses by id
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The buses id
 *     responses:
 *       200:
 *         description: The buses description by id
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *       404:
 *         description: The buses was not found
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 */
router.get('/:id', isValidaId,getSingleBus)
/**
 * @swagger
 * /api/v1/buses/{id}:
 *   delete:
 *     summary: Remove the buses by id
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The buses id
 * 
 *     responses:
 *       200:
 *         description: The buses was deleted
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *       404:
 *         description: The buses was not found
 *         content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *       500:
 *        description: Internal server error
 *        content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 */
router.delete('/:id',isLoggedIn ,checkAuth, isValidaId,deleteBus)
/**
 * @swagger
 * /api/v1/buses/{id}:
 *  put:
 *    summary: Update the buses information
 *    tags: [Buses]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The buses id 
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/buses'
 *    responses:
 *      200:
 *        description: buses updated
 *        content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *      404:
 *        description: buses not found
 *        content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 *      500:
 *        description: Internal server error
 *        content:
 *           application/json:
 *              schema: 
 *                $ref: "#/components/schemas/response"
 */
router.put('/:id',isLoggedIn ,checkAuth ,isValidaId ,updateBus)

export default router