import { success } from "../function/respond";
import initBusStatus from "./schema/busStatusSchema";
import { users,drivers,buses,routes } from "../models";
import db from "../models/index";

const driverAction =  async (req,res) =>{    
    try {
       const { userId,status,location,passengers } = req.body;
       /* =========== Start: getting driver information ========= */ 
            const driver = await drivers.findOne({ 
                where:{
                    userId               
                },
                include:[
                    {
                        model: users,
                        attributes:['id',"fullname","email"],
                        required: false
                    },
                    {
                        model: buses,
                        attributes:['id',"bustype","routecode","routeId","platenumber"],
                        required: false
                    }          
                ]
            })
            const routesInfo = await routes.findOne({
                    where:{
                        id:driver.bus.routeId
                    },
                    attributes:['id',"name","code","startLocation","endLocation"] })
        /* ============= End: getting driver information ========= */ 
        const busStatus = await initBusStatus();

        const startedOnLocation = {
            latitude: routesInfo.startLocation.split(',')[0],
            longitude: routesInfo.startLocation.split(',')[1],
        };
        const currentLocation = {
            latitude: location.latitude,
            longitude: location.longitude,
        };
        const endinOnlocation = {
            latitude: routesInfo.endLocation.split(',')[0],
            longitude: routesInfo.endLocation.split(',')[1],
        };

    
        /* get cache  */
        const busCache = await busStatus.search()
<<<<<<< HEAD
        .where('platenumber')
        .equal(driver.bus.platenumber)
        .return.first(); 

        if(status == "start"){
            /* if cache exist */          
            if(busCache != null){         
                busCache.routename = routesInfo.name,
=======
        .where('driverId')
        .equal(driver.user.id)
        .return.first(); 

        if(status == "start"){
            /* if cache exist */            
            if(busCache){              
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
                busCache.currentLocation = JSON.stringify(currentLocation) ;
                busCache.passengers = Number(passengers);
                busCache.status= "on board";
                busCache.routecode= routesInfo.code == null ? driver.bus.routecode :  routesInfo.code ,
                await busStatus.save(busCache);
                return success(res, 200, { bus: busCache} , 'locations');
            } 

            /* create cache */ 
            const busInfo = await busStatus.createAndSave({
                id: driver.bus.id,
                driverId: driver.id,
                fullname: driver.user.fullname,
<<<<<<< HEAD
                routename: routesInfo.name,
=======
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
                routecode: routesInfo.code == null ? driver.bus.routecode :  routesInfo.code  ,
                platenumber: driver.bus.platenumber,
                passengers:Number(passengers),
                status: "on board",
                currentLocation:JSON.stringify(currentLocation) ,
                startLocation: JSON.stringify(startedOnLocation),
                endLocation:JSON.stringify(endinOnlocation)
            });

<<<<<<< HEAD
            return success(res, 200, { bus: busCache} , 'locations');
=======
            return success(res, 200, { bus: busInfo} , 'locations');
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
        }
        if(status == "remove"){
             busStatus.remove(req.body.id)

            return success(res, 200, { removed: 1} , 'locations');
        }
        return success(res, 200, { bus: busCache} , 'Bus listed');
    } catch (error) {
        console.log(error.message);
    }
   
}


export { driverAction }