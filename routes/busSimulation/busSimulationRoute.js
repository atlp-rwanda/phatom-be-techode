import express from "express";
import { busListView } from "../../controllers/busStatus";
import { driverAction } from "../../controllers/driverActive";
const router = express.Router();

router.get('/activebuses', busListView)
router.post('/action', driverAction)
export default router