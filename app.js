import dotEnv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import usersRoutes from './routes/users/users.js';
import options from './config/options.js';

dotEnv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const specs = swaggerJsDoc(options);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

/* ========== Start:: Root directory ========= */ 
  app.get('/', (req, res) => {
    res.send('Weclome to Phantom.');
  });
/* ============ End:: Root directory ========= */ 

/* ========== Start:: User api url ========= */ 
  app.use('/api/v1/users', usersRoutes);
/* ============== Start:: User api ========= */ 

/* ========== Start:: Api documantation version one ============ */ 
  app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(specs));
/* ========== Start:: Api documantation version one ============ */ 


app.listen(PORT, () => {
  app.emit("Started")
  console.log(`app is listening on port ${PORT}`);
});


export  { app };
