import { Router } from 'express';
import {
 removeBus,
	Assign, 
} from '../../controllers/busRouteAssignController.js';
import Auth, { adminAuth } from '../../middlewares/authentication.js';
import isValidaId from '../../middlewares/isValidaId.js';

const assignRouter = Router();



/**
 * @swagger
 * /api/v1/assign/bus-to-route/{plate}/{code}:
 *  post:
 *    summary: assign bus to route
 *    tags:
 *      - Bus to route
 *    description: fill in your plate nuber and route code
 *    parameters:
 *      - in: path			
 *        name: code
 *        description: 
 *      - in: path			
 *        name: plate
 *        description: 
 *      - in: header
 *        name: auth-token
 *        description: Token is required
 *        schema:
 *          type: string 
 *    responses:
 *      200:
 *        description: successful
 * 
 */

assignRouter.post('/bus-to-route/:plate/:code',Auth,Assign);
assignRouter.put('/bus-to-route/:plate/',Auth,removeBus);

export default assignRouter;
