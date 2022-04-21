import express from 'express'
import { addRoute, allRoutes, getSingleRoute, deleteRoute, updateRoute } from '../../controllers/routesController'
import { adminAuth } from '../../middlewares/authentication'
import isValidaId from '../../middlewares/isValidaId'
import isValidRouteEntry from '../../middlewares/validateRouteEntry'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     routes:
 *       type: object
 *       required:
 *         - name
 *         - code
 *         - city
 *         - startLocation
 *         - endLocation
 *         - duration
 *         - distance
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the route 
 *         code:
 *           type: string
 *           description: Code of the route 
 *         city:
 *           type: string
 *           description: City of the route 
 *         startLocation:
 *           type: string
 *           description: Starting position 
 *         endLocation:
 *           type: string
 *           description: Destination position
 *         duration:
 *           type: string
 *           description: Estimated duration
 *         distance:
 *           type: string
 *           description: Estimated distance
 *       example:
 *         name: Nyamirambo - Gatsata
 *         code: 406  
 *         city: Kigali
 *         startLocation: Nyamirambo
 *         endLocation: Gatsata
 *         duration: 8
 *         distance: 401
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
 * /api/v1/routes/register:
 *  post:
 *    tags:
 *    - "Routes"
 *    parameters:
 *     - in: header
 *       name: Accept-Language
 *       description: fr for french and en for english default is english
 *     - in: header
 *       name: auth-token
 *       description: Valid token for access
 *       schema:
 *         type: string
 *    summary: Create a route 
 *    description: Fill inforamation of route like name, code, city, startLocation, endLocation, duration, distance 
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The route's name.
 *                 example: Nyamirambo - Gatsata  
 *               code:
 *                 type: string
 *                 description: The route's code.
 *                 example: 406     
 *               city:
 *                 type: string
 *                 description: The route's city.
 *                 example: Kigali
 *               startLocation:
 *                 type: string
 *                 description: Starting position.
 *                 example: Nyamirambo
 *               endLocation:
 *                 type: string
 *                 description: Destination position.
 *                 example: Gatsata
 *               duration:
 *                 type: string
 *                 description: Estimated duration.
 *                 example: 8
 *               distance:
 *                 type: string
 *                 description: Estimated distance.
 *                 example: 431
 *    responses:
 *      '200':
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
router.post('/register', adminAuth, isValidRouteEntry, addRoute)

/**
 * @swagger
 * /api/v1/routes:
 *   get:
 *     summary: Getting all routes
 *     tags: [Routes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *       - name: Accept-Language
 *         in: header
 *         description: fr for french and en for english default is english
 *         schema:
 *          type: string              
 *     responses:
 *       200:
 *         description: All available routes
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
router.get('/', allRoutes)

/**
 * @swagger
 * /api/v1/routes/{id}:
 *   get:
 *     summary: Get the routes by id
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route id
 *       - name: Accept-Language
 *         in: header
 *         description: fr for french and en for english default is english
 *         schema:
 *          type: string       
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
router.get('/:id', isValidaId, getSingleRoute)

/**
 * @swagger
 * /api/v1/routes/{id}:
 *   delete:
 *     summary: Remove the route by id
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The route id
 *       - name: Accept-Language
 *         in: header
 *         description: fr for french and en for english default is english
 *         schema:
 *           type: string
 *       - in: header
 *         name: auth-token
 *         description: Valid token for access
 *         schema:
 *           type: string
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
router.delete('/:id', adminAuth, isValidaId, deleteRoute)

/**
 * @swagger
 * /api/v1/routes/{id}:
 *  put:
 *    summary: Update the route information
 *    tags: [Routes]
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The buses id 
 *       - name: Accept-Language
 *         in: header
 *         description: fr for french and en for english default is english
 *         schema:
 *          type: string  
 *       - in: header
 *         name: auth-token
 *         description: Valid token for access
 *         schema:
 *          type: string     
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The route's name.
 *                 example: Nyamirambo - Gatsata  
 *               code:
 *                 type: string
 *                 description: The route's code.
 *                 example: 406     
 *               city:
 *                 type: string
 *                 description: The route's city.
 *                 example: Kigali
 *               startLocation:
 *                 type: string
 *                 description: Starting position.
 *                 example: Nyamirambo
 *               endLocation:
 *                 type: string
 *                 description: Destination position.
 *                 example: Gatsata
 *               duration:
 *                 type: string
 *                 description: Estimated duration.
 *                 example: 8
 *               distance:
 *                 type: string
 *                 description: Estimated distance.
 *                 example: 431
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
router.put('/:id', adminAuth, isValidaId,  updateRoute)

export default router 