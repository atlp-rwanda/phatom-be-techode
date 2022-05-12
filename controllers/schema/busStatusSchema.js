import { Entity, Schema } from 'redis-om';
import client from '../../config/client.js';

class ActiveBusEntity extends Entity {}

const BusSchema = new Schema(ActiveBusEntity, 
	{
		id: { type: 'number' },
		driverId: { type: 'number' },
		fullname: { type: 'string' },
<<<<<<< HEAD
		routename: { type: 'string' },
=======
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
		routecode: { type: 'string' },
		platenumber:{ type: 'string' },
		passengers: { type: 'number' },
		status: { type: 'string' },
		currentLocation: { type: 'string' },
		startLocation: { type: 'string' },
		endLocation: { type: 'string' }
	},
	{
		dataStructure:"JSON"
    }
);

<<<<<<< HEAD
 /* c8 ignore next 10*/
=======
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
const initBusStatus = async () => {
	try {
		const redisClient = await client();
		const repo =  redisClient.fetchRepository(BusSchema);
<<<<<<< HEAD
		await repo.createIndex();
		return repo;
	} catch (error) {
		return 0
	}	
=======
		await repo.createIndex();		
		
		return repo;
	} catch (error) {
		console.log(error.message);
	}
	
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
};

export default initBusStatus

