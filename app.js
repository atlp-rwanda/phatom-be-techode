import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";

import usersRoutes from './routes/users/users.js';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Phantom - Techode',
            version: '1.0.0',
            description: 'Phantom backend Express Library API'
        },
        servers: [
         {
            url: `https://localhost:5000/`,
           //  url: 'http://localhost:7000/api/v1'
         
         }], 
         components: {
           securitySchemes: {
             bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               in: 'header',
               bearerFormat: 'JWT'
             }
           }
         },
         security: [
           {
             bearerAuth: []
           }
         ], 
    },
   
    apis: ["./routes/dashboard/*.js", './routes/users/*.js','./routes/authentication/*.js']     
 }

 const specs = swaggerJsDoc(options)
app.use('/api/doc', swaggerUI.serve, swaggerUI.setup(specs));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Weclome to Phantom.');
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));