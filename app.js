import bodyParser from 'body-parser';
import cookies from "cookie-parser";
import cors from 'cors';
import dotEnv from 'dotenv';
import express from 'express';
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import options from './config/options.js';
import { success } from "./function/respond.js";
import assignRouter from './routes/assign-bus-routes/assign.js';
import dashboardRoutes from './routes/dashboard/dashboard.js';
import languageRoutes from './routes/language';
import loginRoute from './routes/logins';
import profileRoutes from './routes/profile/profilePic.js'
import permission from './routes/permissions/permissions.js';
import rolesRoute from './routes/roles/roles.js';
import accountRouter from './routes/users/accounts.js';
import busesRoute from './routes/buses/busesRoute.js';
import usersRoutes from './routes/users/users.js';
import routesRoute from './routes/routes/routesRoute'




/* ========== setting up dotenv ============= */
dotEnv.config()



const app = express();
/* c8 ignore next 1 */ 
const PORT = process.env.PORT || 5000;
const specs = swaggerJsDoc(options);


app.use(cookies());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware.handle(i18next))
app.use(express.json())

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


/* ========== Start:: Root directory ========= */ 
  app.get('/', (req, res) => {
    return success(res,200,null,"welcome", req);
  });
/* ============ End:: Root directory ========= */ 



/* ========== Start:: Route api url ========= */ 
app.use('/api/v1/routes', routesRoute);
/* ============== End:: Route api ========= */ 

/* ========== Start:: Admin api url ========= */ 
  app.use('/api/v1/dashboard', dashboardRoutes);
/* ============== End:: Admin api ========= */ 

/* ========== Start:: User api url ========= */ 
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/users/login', loginRoute);
/* ============== Start:: User api ========= */ 

/*======= START:: Update profile api ======= */
app.use('/api/v1/profile', profileRoutes);
/*======= START:: Update profile api ======= */


/* ========== Start:: role api url ========= */ 
  app.use('/api/v1/roles', rolesRoute);
/* ============== Start:: role api ========= */ 

/* ========== Start:: permissions api url ========= */ 
  app.use('/api/v1/permissions', permission);
/* ============== Start:: permissions api ========= */ 

/* ========== Start:: Api documantation version one ============ */ 
  app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(specs));

/* ========== Start:: buses api url ========= */ 
  app.use('/api/v1/buses', busesRoute);
/* ============== End:: buses api ========= */ 


/* ========= Start:: forget password ======== */     
  app.use('/api/v1/accounts', accountRouter);  

/* ========= End:: forget password ======== */  

app.use('/api/v1/lng', languageRoutes);
app.use("/api/v1/assign", assignRouter)

app.listen(PORT, () => {
  app.emit("Started")
  console.log(`app is listening on port ${PORT}`);
})
export { app };



