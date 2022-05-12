import express from 'express'
import { getAllpermissions, createPermission, getSinglePermision } from "../../controllers/permissionsController.js"


const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *    Permissions:
 *       type: object
 *       required:
 *         - "permission_name"
 *       properties:
 *          id:
 *            type: integer
 *            description: It is auto incremented    
 *          permission_name:
 *            type: string
 *            description: This is contains permission
 *          permission:
 *            type: string
 *            description: This is contains permission name without space for the development 
 *          createdAt:
 *            type: string
 *            description: This is holds user email
 *          updatedAt:
 *            type: string
 *            description: This is holds user email
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
 *  name: Permssions
 *  description: Permssions api, the are predefined
 * 
 * */ 

/**
 * @swagger
 * 
 * /api/v1/permissions:
 *  get:
 *    summary: Getting permissions 
 *    tags:
 *    - "Permssions"
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *      - in: query
 *        name: size
 *        schema:
 *          type: integer
 *      - in: query
 *        name: order
 *        schema:
 *          type: string  
 *      - in: header
 *        name: Accept-Language
 *        description: fr for french and en for english default is english
 *        schema:
 *          type: string    
 *    responses:
 *        200:
 *         description: Retrieved
 *         content:
 *            application/json:
 *                schema:
 *                   type: object
 *                   properties:
 *                      status:
 *                         type: string
 *                      data:
 *                         type: object
 *                      message:
 *                         type: string
 * 
 *         401:
 *           description:  Unauhtorized
 *           content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"
 *        500:
 *          description: Server error
 *          content:
 *              application/json:
 *                schema: 
 *                  $ref: "#/components/schemas/error"      
 * 
* */

/* === Start:: list all permission route === */  
    router.get('/', getAllpermissions);
/* ==== End:: list all permission route === */ 

/* === Start:: list single permission route === */  
    router.get('/:permission', getSinglePermision);
/* ==== End:: list single permission route === */ 
export default router
