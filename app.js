import dotEnv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import usersRoutes from './routes/users/users.js';
import accountRouter from './routes/users/accounts.js';
import options from './config/options.js';
import i18next from 'i18next';
import backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import languageRoutes from './routes/language'

dotEnv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const specs = swaggerJsDoc(options);





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
    res.send('Weclome to Phantom.');
  });
/* ============ End:: Root directory ========= */ 


/* ========== Start:: User api url ========= */ 
  app.use('/lng', languageRoutes);
/* ========== Start:: User api url ========= */ 

/* ========== Start:: User api url ========= */ 
  app.use('/api/v1/users', usersRoutes);

/* ============== Start:: User api ========= */ 

/*=============== Start:: Reset api url ===============*/
app.use('api/v1/accounts', accountRouter)

/*===============End:: Reser api url ===============*/

/* ========== Start:: Api documantation version one ============ */ 
  app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(specs));
/* ========== Start:: Api documantation version one ============ */ 


app.listen(PORT, () => {
  app.emit("Started")
  console.log(`app is listening on port ${PORT}`);
});


export  { app };
