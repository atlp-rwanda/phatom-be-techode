import express from "express";

import userController from "../../controllers/userController.js";

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
 *         - age
 *       properties:
 *         firstName:
 *           type: string
 *           description: First Name
 *         lastName:
 *           type: string
 *           description: Last Name
 *         age:
 *           type: string
 *           description: Age
 *       example:
 *         firstName: Funny
 *         lastName: Moon
 *         age: 25
 *        
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     parameters:
 *      - in: header
 *        name: token
 *        schema:
 *          type: string
 *        required: true
 *        description: Auth-token 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dashboard'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *       500:
 *         description: Some server error
 */
router.post('/', userController.postUser);

export default router;