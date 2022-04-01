import dotEnv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from "swagger-jsdoc";
import usersRoutes from './routes/users/users.js';
import source from './connection/connection.js';

/* ========== setting up dotenv ============= */
dotEnv.config()

// accessing dotEnv variable
console.log(process.env.ENVIRONMENT)
/* ========== setting up dotenv ============= */


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

source.initialize()
	.then(async () => {
		app.listen(PORT, () => {
			console.log(`app is listening on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(
			"The server couldn't be started. The database is not connected msg:" + error.message
		);
	});

export default app
