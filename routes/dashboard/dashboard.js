import express from "express";

import dashBoardController from "../../controllers/dashboardController.js";
import {adminAuth} from '../../middlewares/authentication.js'

const router = express.Router();


/** 
* @swagger
 * components:
 *   schemas:
 *     Dashboard:
 *       type: object
 *       required:
 *         - authorId
 *         - blogImage
 *         - title
 *         - subTitle
 *         - blogPost
 *       properties:
 *         authorId:
 *           type: string
 *           description: Author ID
 *         blogImage:
 *           type: string
 *           description: Image of the blog
 *         title:
 *           type: string
 *           description: title of the blog
 *         subTitle:
 *           type: string
 *           description: blog subtitle
 *         blogPost:
 *           type: string
 *           description: contents of the blog
 *       example:
 *         authorId: d5fE_aszhjgggggbjasgj989870
 *         blogImage: png/jpeg
 *         title: how to learn css
 *         subTitle: types of css
 *         blogPost: Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without
 *        
 */

/**
 * @swagger
 * /api/v1/dashboard/logout:
 *   post:
 *     summary: Create a valid token
 *     tags: [Dashboard]
 *     parameters:
 *      - in: header
 *        name: auth-token
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
 *         description: The Blog was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *       500:
 *         description: Some server error
 */
router.post('/logout', adminAuth, dashBoardController.logout);

/**
 * @swagger
 * /api/v1/dashboard/token:
 *   get:
 *     summary: Logout
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: The list of the Blogposts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dashboard'
 */
router.get('/token', dashBoardController.generateToken)

export default router;