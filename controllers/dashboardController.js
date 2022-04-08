import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser'
import express from 'express'
import { success,fail,sendError } from "../function/respond.js";



const logout = (req, res) => {


    if (res.cookie) {
        res.clearCookie("access-token");
        res.redirect('/');
        return success(res,200,null,"phantomLogout",req);
        res.end()
    } else {
        res.send('No session available.');
         console.log('Session ', req.cookie)
    }
    
  };

 const generateToken = (req, res) => {
     const token = jwt.sign({id: "kadj4nb"}, "Techode");
     res.cookie("access-token", token,{
              maxAge: 60*60*24,
            })
    //  res.send(token);
    return success(res,200,token,"token",req);
 } 


export default { logout, generateToken };