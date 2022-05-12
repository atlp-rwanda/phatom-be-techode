import express from 'express'
import { createUser,getAllUsers, getSingleUser, deleteUser, updateUser } from "../../controllers/userController.js"
import {  users } from "../../models"
import paginate from '../../middlewares/paginate.js';
import { validId, validCreate, validAssign } from '../../middlewares/validation'
import { assignBus, unAssignBus} from "../../controllers/assignBusController"
import { isAuth } from '../../controllers/authsController.js';

const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName   
 *         - username
 *         - userType
 *         - email
 *         - telephone
 *       properties:
 *         firstname:
 *           type: string
 *           description: firstname of the user 
 *         lastname:
 *           type: string
 *           description: lastname of the user 
 *         email:
 *           type: string
 *           description: email of the user 
 *         telephone:
 *           type: string
 *           description: telephone of the user
 *       example:
 *         firstname: John
 *         lastname: Doe  
 *         username: doeJohn
 *         userType: Driver
 *         email: name@gmail.com
 *         telephone: 078699866
 *   error: 
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
 * tags:
 *  name: Users
 *  description: Users
 * 
 * */ 

/**
 * @swagger
 * tags:
 *  name: Assign 
 *  description: Assign drivers to buses
 * 
 * */ 

/**
 * @swagger 
 * /api/v1/users:
 *  post:
 *    summary: Creating user
 *    tags:
 *    - "Users"
 *    parameters:
 *      - name: Accept-Language
 *        in: header
 *        description: fr for french and en for english default is english 
 *        schema:
 *          type: string
 *      - in: header
 *        name: auth-token
 *        description: Valid token for access
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 firstname:
 *                    type: string
 *                    description: This string of firstname
 *                 lastname:
 *                    type: string
 *                    description: This string of lastname
 *                 username:
 *                    type: string
 *                    description: This string of username
 *                 telephone:
 *                    type: string
 *                    description: This string of 10 telephone number
 *                 userType:
 *                    type: string
 *                    description: This string of user type either Driver or Operator
 *                 email:
 *                    type: string
 *                    description: This string of your email
 *    responses:
 *        200: 
 *          description: role have been created
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: object 
 *                    message:
 *                      type: string                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Unauthorized
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"   
 * */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Getting all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All available Users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Internal server error
 *       401:
 *         description: Unauthorized   
*/  

/**
 * 
 * @swagger  
 * /api/v1/users/{id}:
 *  put:
 *    summary: Updating a user
 *    tags:
 *    - "Users"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: user id
 *        required: true
 *        schema:
 *          type: integer
 *      - name: Accept-Language
 *        in: header
 *        description: fr for french and en for english default is english 
 *        schema:
 *          type: string
 *      - in: header
 *        name: auth-token
 *        description: Valid token for access
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: false
 *              properties:
 *                 firstname:
 *                    type: string
 *                    description: Contains firstname
 *                 lastname:
 *                    type: string
 *                    description: Contains lastname
 *    responses:
 *        200: 
 *          description: Updated
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: integer
 *                    message:
 *                      type: string  
 *                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Unauhtorized
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        404:
 *          description: User doesn't exist
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * */ 


/**
 * @swagger 
 * 
 * /api/v1/users/{id}:
 *  delete:
 *    summary: Deleting a user
 *    tags:
 *    - "Users"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: user id
 *        required: true
 *        schema:
 *          type: integer
 *      - name: Accept-Language
 *        in: header
 *        description: fr for french and en for english default is english 
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: Updated
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: integer
 *                    message:
 *                      type: string  
 *                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Unauhtorized
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        404:
 *          description: Unauhtorized
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * */ 



/**
 * @swagger 
 * 
 * /api/v1/users/paginated:
 *  get:
 *    summary: getting a roles
 *    tags:
 *    - "Users"
 *    parameters:
 *      - name: page
 *        in: path
 *        description: page number
 *        schema:
 *          type: integer 
 *      - name: limit
 *        in: path
 *        description: limit number of data 
 *        schema:
 *          type: integer
 *      - name: Accept-Language
 *        in: header
 *        description: fr for french and en for english default is english 
 *        schema:
 *          type: string
 *      - in: header
 *        name: auth-token
 *        description: Valid token for access
 *        schema:
 *          type: string
 *    responses:
 *        200: 
 *          description: Retrived
 *          content:
 *            application/json:
 *                schema:
 *                  $ref: "#/components/schemas/users"
 *        401:
 *          description: Unauhtorized
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * */ 


/**
 * 
 * @swagger  
 * /api/v1/users/assign_buses/:
 *  put:
 *    summary: Assgining drivers to buses
 *    tags:
 *    - "Assign"
 *    parameters:
 *      - name: Accept-Language
 *        in: header
 *        description: fr for french and en for english default english
 *        schema:
 *          type: string
 *      - in: header
 *        name: auth-token
 *        description: Valid token for access
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 userId:
 *                    type: integer
 *                    description: Contains role role id to gain new permission
 *                 busId:
 *                    type: integer
 *                    description: Contains role id to assing to a role
 *    responses:
 *        200: 
 *          description: Updated
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: object
 *                    message:
 *                      type: string  
 *                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        404:
 *          description: User or bus not found
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Unauhtorized
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server users
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * */ 

/**
 * 
 * @swagger  
 * /api/v1/users/unassign_buses/:
 *  put:
 *    summary: unAssgining drivers to buses
 *    tags:
 *    - "Assign"
 *    parameters:
 *      - name: Accept-Language
 *        in: header
 *        description: fr for french and en for english default english
 *        schema:
 *          type: string
 *      - in: header
 *        name: auth-token
 *        description: Valid token for access
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 userId:
 *                    type: integer
 *                    description: Contains role role id to gain new permission
 *                 busId:
 *                    type: integer
 *                    description: Contains role id to assing to a role
 *    responses:
 *        200: 
 *          description: Updated
 *          content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                    data:
 *                      type: object
 *                    message:
 *                      type: string  
 *                        
 *        400:
 *          description: Invalid inputs
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        404:
 *          description: User or bus not found
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        401:
 *          description: Unauhtorized
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server users
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * */ 


/* === Start:: list all users route === */ 
    router.get('/', getAllUsers);
/* ==== End:: list all users route === */ 

    router.get('/paginated', paginate(users));

/* === Start:: Create users route === */ 
    router.post('/', validCreate, createUser);
/* ==== End:: Create users route === */ 
    router.get('/:id', validId, getSingleUser)
    router.delete('/:id',validId, deleteUser)
    router.put('/assign_buses', validAssign, assignBus)
    router.put('/unassign_buses', validAssign, unAssignBus)
    router.put('/:id',validId, updateUser)
    router.post('/isauth', isAuth);

export default router
