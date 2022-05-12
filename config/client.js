import { Client } from 'redis-om';
import { config } from 'dotenv'

config();

const client = async () => {
    try {
        let client = await new Client()
        return await client.open(process.env.REDIS_URL)
    } catch (error) {
        console.log(error.message);
    }
    
};


export default client;
