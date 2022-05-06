import { Entity, Schema } from 'redis-om';
import client from '../../config/client.js';

class ActiveBusEntity extends Entity {}

const BusSchema = new Schema(ActiveBusEntity, 
	{
		id: { type: 'number' },
		driverId: { type: 'number' },
		fullname: { type: 'string' },
		routename: { type: 'string' },
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

 /* c8 ignore next 10*/
const initBusStatus = async () => {
	try {
		const redisClient = await client();
		const repo =  redisClient.fetchRepository(BusSchema);
		await repo.createIndex();
		return repo;
	} catch (error) {
		return 0
	}	
};

export default initBusStatus

