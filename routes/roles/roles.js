import express from 'express'
import { createRoute } from '../../controllers/dammyController.js';
import  { removeRole,getAllroles, createRole , deleteRole, assignPermssion,removePermission,assignRole,updateRole } from "../../controllers/rolesController.js"
import checkAuth from '../../middlewares/checkAuthorization.js';


const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *    Roles:
 *       type: object
 *       required:
 *         - "rolename"
 *       properties:
 *          id:
 *            type: integer
 *            description: It is auto incremented    
 *          rolename:
 *            type: string
 *            description: This is contains role name value
 *          permissions:
 *            type: string
 *            description: This is contains role name value
 *          isDeleted:
 *            type: boolean
 *            description: This is contains role name value
 *          createdAt:
 *            type: string
 *            description: This is holds data and it default
 *          updatedAt:
 *            type: string
 *            description: This is holds date and it default
 *    error: 
 *      type: object
 *      properties:
 *        status:
 *          type: string
 *        data:
 *          type: null
 *        message:
 *          type: string  
 * */ 



/**
 * @swagger
 * tags:
 *  name: Roles
 *  description: Roles inherts permission
 * 
 * */ 

/**
 * @swagger
 * tags:
 *  name: Access 
 *  description: Access controll
 * 
 * */ 


/**
 * @swagger
 * tags:
 *  name: Access 
 *  description: Access controll
 * 
 * */ 


/**
 * @swagger 
 * /api/v1/roles:
 *  post:
 *    summary: Creating role
 *    tags:
 *    - "Roles"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 rolename:
 *                    type: string
 *                    description: This string of role name
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
 * 
 * @swagger  
 * /api/v1/roles/{id}:
 *  put:
 *    summary: Updating a user
 *    tags:
 *    - "Roles"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: role id
 *        required: true
 *        schema:
 *          type: integer
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: false
 *              properties:
 *                 rolename:
 *                    type: string
 *                    description: Contains role name
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
 * /api/v1/roles/{id}:
 *  delete:
 *    summary: Deleting a user
 *    tags:
 *    - "Roles"
 *    parameters:
 *      - name: id
 *        in: path
 *        description: role id
 *        required: true
 *        schema:
 *          type: integer
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
 * /api/v1/roles:
 *  get:
 *    summary: getting a roles
 *    tags:
 *    - "Roles"
 *    responses:
 *        200: 
 *          description: Retrived
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
 * /api/v1/roles/permission/assign:
 *  post:
 *    summary: Assgining permissions to role
 *    tags:
 *    - "Access"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 roleid:
 *                    type: integer
 *                    description: Contains role role id to gain new permission
 *                 permissionid:
 *                    type: integer
 *                    description: Contains permission id to assing to a role
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
 * /api/v1/roles/permission/remove:
 *  delete:
 *    summary: Removing permissions from role
 *    tags:
 *    - "Access"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 roleid:
 *                    type: integer
 *                    description: Contains role role id to gain new permission
 *                 permissionid:
 *                    type: integer
 *                    description: Contains permission id to assing to a role
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
 * /api/v1/roles/permission/assign:
 *  post:
 *    summary: Assgining permissions to role
 *    tags:
 *    - "Access"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 roleid:
 *                    type: integer
 *                    description: Contains role role id to gain new permission
 *                 permissionid:
 *                    type: integer
 *                    description: Contains permission id to assing to a role
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
 * /api/v1/roles/assign/users:
 *  put:
 *    summary: Assgining permissions to the user
 *    tags:
 *    - "Access"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 userId:
 *                    type: integer
 *                    description: Contains role role id to gain new permission
 *                 roleId:
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
 * /api/v1/roles/remove/users:
 *  delete:
 *    summary: Assgining permissions to the user
 *    tags:
 *    - "Access"
 *    requestBody:
 *      content:
 *        application/json:
 *            schema:
 *              required: true
 *              properties:
 *                 userId:
 *                    type: integer
 *                    description: Contains role role id to gain new permission
 *                 roleId:
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
 * /api/v1/roles/createAccessTest:
 *  post:
 *    summary: Testing access control
 *    tags:
 *    - "testAccess"
 *    parameters:
 *      - name: userId
 *        in: header
 *        description: User to who is making action
 *        required: true
 *        schema:
 *          type: integer
 *      - name: action
 *        in: header
 *        description: Action , like getRoute 
 *        required: true
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




/* === Start:: list all roles  === */  
    router.get('/', getAllroles);
/* ==== End:: list all roles  ==== */ 

/* === Start:: Create roles  ===== */ 
    router.post('/', createRole);
/* ==== End:: Create roles  ====== */ 

/* === Start:: Delete roles  ===== */ 
    router.delete('/:id', deleteRole);
/* ==== End:: Delete roles  ====== */ 

/* ===== Start:: Update roles  ===== */ 
    router.put('/:id', updateRole);
/* ====== End:: Update roles  ====== */ 

/* =========== Start:: Remove roles  ======================= */ 
    router.delete('/permission/remove', removePermission);
/* ============= End:: Remove roles  ======================= */ 

/* ===== Start:: Assign roles permission to roles  ====== */ 
    router.post('/permission/assign', assignPermssion);
/* ======= End:: Assign roles permission to roles  ====== */ 

/* ============= Start:: Assign roles to user  ===== */ 
    router.put('/assign/users', assignRole);
/* =============== End:: Assign roles to user  ===== */ 

/* ============= Start:: Romove roles from user  ===== */ 
    router.delete('/remove/users', removeRole);
/* =============== End:: Remove roles from user  ===== */ 


/* ============= Start:: Testing access controll ===== */ 
    router.post('/createAccessTest', checkAuth , createRoute);
/* =============== End:: Testing access controll  ===== */ 


export default router
