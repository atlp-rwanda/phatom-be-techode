import jwt from 'jsonwebtoken';
import cookie from 'cookie-parser'
import express from 'express'



const logout = (req, res) => {

    //  const { access-token } = res.cookie;

    if (res.cookie) {
        console.log('Session ', req.cookie)
        res.clearCookie("access-token");
        res.redirect('/');
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
     res.send(token);
 } 


export default { logout, generateToken };