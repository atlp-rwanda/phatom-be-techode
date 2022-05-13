import { contacts } from "../models";
import { success, fail, sendError } from '../function/respond.js';
import sendEmail from '../utils/resetUtil';
import {
	validateContactOnSend,
} from '../function/validation';

const sendContact = async (req, res) => {
    const { fullname, message, email, phonenumber } = req.body;
    
	 contacts.create({
	 		fullname,
	 		message,
	 		email,
	 		phonenumber,
	 	})
		 .then(async (oneContact) => {
            await sendEmail(`${ req.t(message)}`, oneContact.email, null ,req.t('emailMessage'));
			 return success(res, 201, oneContact, 'Message sent', req);
		 })
		/* c8 ignore next 1*/
		 .catch((errors) => { console.log(errors); });

        }; 
export { sendContact };
