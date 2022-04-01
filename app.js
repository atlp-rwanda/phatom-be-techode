import dotEnv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";
import usersRoutes from './routes/users/users.js';

import i18next from 'i18next'
import backend from 'i18next-fs-backend'
import middleware from 'i18next-http-middleware'

import languageRoutes from "./routes/language.js"


/* ========== setting up dotenv ============= */
dotEnv.config()

// accessing dotEnv variable
console.log(process.env.ENVIRONMENT)
/* ========== setting up dotenv ============= */


const app = express();
app.use(cors());
app.use(middleware.handle(i18next))
app.use(express.json())

const PORT = process.env.PORT || 5000;


/* ========== setting up multi language configuration ============= */
i18next
.use(backend)
.use(middleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})

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

app.use('/lng', languageRoutes);

app.get('/', (req, res) => {
    res.send(req.t('welcome'));
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
export default app
