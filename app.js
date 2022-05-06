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
import activeBusSimulationRoute from './routes/busSimulation/busSimulationRoute'
import  http  from "http";
import socketIo from "socket.io"
import client from './config/client.js';
import initBusStatus from './controllers/schema/busStatusSchema.js';


/* ========== setting up dotenv ============= */
dotEnv.config()


const app = express();
/* c8 ignore next 1 */ 
const PORT = process.env.PORT || 5000;
const specs = swaggerJsDoc(options);
const socketServer = http.Server(app);

const io = socketIo(socketServer,{
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
		transports: ['websocket', 'polling'],
		credentials: true,
	},
	allowEIO3: true,
});


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



const newClient = new Set();
 /* c8 ignore next 162*/
io.on('connection', function (socket) {
	/* redis client */ 
	newClient.add(socket.id);	
	console.log(socket.id);
	
	socket.on('startBus', async (data) =>  {
		const busStatus = await initBusStatus();
		
		socket.emit('busStarted', {
			bus: data
		});	
		
	});

	socket.on('stopBus', async (data) => {
		const busStatus = await initBusStatus();
		let busInfo = await busStatus.fetch(data.id);
		if(busInfo != null){
			const currentLocation = {
				latitude: data.location.latitude,
				longitude: data.location.longitude,
			};	
			busInfo.currentLocation = JSON.stringify(currentLocation) ;
			busInfo.passengers = 0;
			busInfo.status = "stopped";
			await busStatus.save(busInfo);
		}
		socket.emit('busStoped', {
			bus: busInfo
		});
		const allBusInfo =  await busStatus.search().return.all();
		io.emit('location_update', {
			bus: allBusInfo
		});
	});
	
	socket.on('alight', async (data) => {
		const busStatus = await initBusStatus();
		let busInfo = await busStatus.fetch(data.id);
		if (busInfo) {
			const currentLocation = {
				latitude: data.location.latitude,
				longitude: data.location.longitude,
			};	
			busInfo.currentLocation = JSON.stringify(currentLocation) ;
			busInfo.passengers = data.passengers;
			busInfo.status = "on board";
			await busStatus.save(busInfo);
		}
		socket.emit('alighted',{
			bus: busInfo
		});
		const allBusInfo =  await busStatus.search().return.all();

		io.emit('location_update', {
			bus: allBusInfo
		});
	});
	

	socket.on('location_update', async (data)=>{
		const busStatus = await initBusStatus();
		let busInfo = await busStatus.fetch(data.id);
		if (busInfo) {
			const currentLocation = {
				latitude: data.location.latitude,
				longitude: data.location.longitude,
			};	
			busInfo.currentLocation = JSON.stringify(currentLocation) ;
			await busStatus.save(busInfo);
			
		} 
		const allBusInfo =  await busStatus.search().return.all();
		io.emit('location_update', {
			bus: allBusInfo
		});
		
	})

	socket.on('passengers_update', async (data)=>{
		const busStatus = await initBusStatus();
		let busInfo = await busStatus.fetch(data.id);
		if (busInfo) {
			const currentLocation = {
				latitude: data.location.latitude,
				longitude: data.location.longitude,
			};	
			busInfo.passengers = Number(data.passengers) ;
			await busStatus.save(busInfo);
		} 
		const allBusInfo =  await busStatus.search().return.all();
		socket.emit('passengers_update', {
			bus: allBusInfo
		});		
		io.emit('location_update', {
			bus: allBusInfo
		});
	})

	socket.on('get_passengers', async (data) =>  {
		const busStatus = await initBusStatus();
		let busInfo = await busStatus.fetch(data.id);
		socket.emit('receive_passengers', {
			bus: busInfo
		});			
	});

	socket.on('get_current', async (data) =>  {
		const busStatus = await initBusStatus();
		let busInfo = await busStatus.fetch(data.id);
		socket.emit('receive_current_passengers', {
			bus: busInfo
		});			
	});


	socket.on('locate', async (data) => {
		const busStatus = await initBusStatus();
		const allBusInfo =  await busStatus.search().return.all();
		socket.emit('located', {
			buses: allBusInfo
		});
	});

	socket.on('finish', async (data) => {
		const busStatus = await initBusStatus();
		socket.emit('location_update', {
			id: "all"
		});		
	});

	
	socket.on("alighting", async (data) =>{
		const busStatus = await initBusStatus();
		const allBusInfo =  await busStatus.search().return.all();
		
		io.emit('location_update', {
			bus: allBusInfo
		});
		let busInfo = await busStatus.fetch(data.id);
		busInfo.status = "Alighting";
		busStatus.save(busInfo)
		socket.emit('alighting', {
			bus: busInfo
		});
	})


	socket.on("killAlighting", async (data) =>{
		const busStatus = await initBusStatus();
		const allBusInfo =  await busStatus.search().return.all();
		let busInfo = await busStatus.fetch(data.id);
		busInfo.status = "on board";
		busStatus.save(busInfo)
		socket.emit('killAlighting', {
			bus: busInfo
		});
		io.emit('location_update', {
			bus: allBusInfo
		});
	})
});

/* ========== Start:: Root directory ========= */ 
  app.get('/', (req, res) => {
    return success(res,200,null,"welcome", req);
  });
/* ============ End:: Root directory ========= */ 



/* ========== Start:: Route  for active buses ========= */ 
	app.use('/api/v1/simulation', activeBusSimulationRoute);
/* ============== End:: Route  for active buses ========= */ 


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

socketServer.listen(PORT, () => {
  app.emit("Started")
  console.log(`app is listening on port ${PORT}`);
})
export { app };



