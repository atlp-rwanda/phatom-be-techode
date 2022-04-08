import dotEnv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import usersRoutes from './routes/users/users.js';
import permission from './routes/permissions/permissions.js';
import rolesRoute from './routes/roles/roles.js';
import options from './config/options.js';
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import languageRoutes from './routes/language'
import loginRoute from './routes/logins';
import dashboardRoutes from './routes/dashboard/dashboard.js'
import cookies from "cookie-parser";
import { success,fail,sendError } from "./function/respond.js";

/* ========== setting up dotenv ============= */
dotEnv.config()

// accessing dotEnv variable
console.log(process.env.ENVIRONMENT)
/* ========== setting up dotenv ============= */




const app = express();
/* c8 ignore next 1 */ 
const PORT = process.env.PORT || 5000;
const specs = swaggerJsDoc(options);


app.use(cookies());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(middleware.handle(i18next))

i18next
.use(backend)
.use(middleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend: {
        loadPath: './locales/{{lng}}/translation.json'
    }
})




/* ========== Start:: Root directory ========= */ 
  app.get('/', (req, res) => {
    // res.send('weclome', req);
    return success(res,200,null,"welcome", req);
  });
/* ============ End:: Root directory ========= */ 


/* ========== Start:: User api url ========= */ 
  app.use('/lng', languageRoutes);
/* ========== Start:: User api url ========= */ 

/* ========== Start:: Admin api url ========= */ 
app.use('/api/v1/dashboard', dashboardRoutes);
/* ============== End:: Admin api ========= */ 

/* ========== Start:: User api url ========= */ 
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/users/login', loginRoute);
/* ============== Start:: User api ========= */ 

/* ========== Start:: role api url ========= */ 
  app.use('/api/v1/roles', rolesRoute);
/* ============== Start:: role api ========= */ 

/* ========== Start:: permissions api url ========= */ 
  app.use('/api/v1/permissions', permission);
/* ============== Start:: permissions api ========= */ 


/* ========== Start:: Api documantation version one ============ */ 
  app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(specs));
/* ========== Start:: Api documantation version one ============ */ 

app.listen(PORT, () => {
  app.emit("Started")
  console.log(`app is listening on port ${PORT}`);
});


export  { app };



