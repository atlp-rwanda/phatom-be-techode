import express from 'express'
import { sendContact } from "../../controllers/contactController"

const router = express.Router();


/* ==== Start:: update user profile === */ 
	router.post('/send', sendContact);
    
/* ==== End:: update user profile === */ 

export default router