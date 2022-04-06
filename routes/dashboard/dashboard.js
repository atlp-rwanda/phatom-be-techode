import express from "express";

import dashBoardController from "../../controllers/dashboardController.js";
import {adminAuth} from '../../middlewares/authentication.js'

const router = express.Router();

router.post('/logout', adminAuth, dashBoardController.logout);
router.get('/token', dashBoardController.generateToken)

export default router;