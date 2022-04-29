import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser'
import express from 'express'
import { success,fail,sendError } from "../function/respond.js";
import { jwtToken } from '../middlewares/auth.js';


/* c8 ignore next 11 */
const logout = (req, res) => {
    if (res.cookie) {
        res.clearCookie("access-token");
        // res.redirect('/');
        return success(res,200,null,"phantomLogout",req);
        // res.end()
    } else {
        res.send('No session available.');
         console.log('Session ', req.cookie)
    }
  };

 const generateToken = (req, res) => {
    let id = Math.floor((Math.random() * 10) + 1);
    const token = jwtToken.createToken({ id , email: process.env.EMAIL_USER }) 
    return success(res,200,token,"token",req);
 } 


export default { logout, generateToken };