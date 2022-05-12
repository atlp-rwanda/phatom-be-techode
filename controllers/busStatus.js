import client from "../config/client";
import { success } from "../function/respond";
import initBusStatus from "./schema/busStatusSchema"



const busListView = async (req, res) => {
   
    try {
        const busStatus = await initBusStatus();
        const result =await busStatus.search().return.all();
        return success(res, 200, { buses: result} , 'Bus listed');
    } catch (error) {
        console.log(error.message);
    }
	
};

export { busListView }