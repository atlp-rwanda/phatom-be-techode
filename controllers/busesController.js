import { success,fail,sendError } from "../function/respond.js";
import { buses } from "../models"
import Sequelize from "sequelize";
import { validateBusInput } from '../function/validation';
import { paginate } from "../utils/paginate.js";

const { Op } = Sequelize;


const busExist = async (busId) =>{
    const getBus = await buses.findByPk( busId ); 
    /* c8 ignore next 3 */ 
    if(getBus) return getBus 
    return false
}

const addBus = async (req,res) => {
    try {
        const { error } = validateBusInput(req.body);
        if(error){
            return fail(res,400,null,error.details[0].message);
        }
    
        const { bustype, routecode, platenumber } = req.body;
        const plateNumberExist = await buses.findOne({where:{platenumber}});
        if(plateNumberExist){
            return fail(res,400,null,"plateExist",req);
        }
    
        const createBus = await buses.create({ bustype, routecode, platenumber });
        return success(res,201,createBus,"busCreated",req);   
        /* c8 ignore next 3 */        
    } catch (error) { return sendError(res,500,null,error.message); }  
}


const getAllBuses = async (req, res) => {    
    try {
        const { page:dataPage, size:dataSize , order: orderBy } = req.query;
        const { page , size ,order } = paginate(dataPage,dataSize,orderBy);
        const allBus = await buses.findAndCountAll({ limit: size, offset: page * size,  order: [
            ["id", order]
          ] });           
        return success(res,200,{buses: allBus.rows , totalPage : Math.ceil(allBus.count / size)},"Retrived",req);        
     /* c8 ignore next 2 */ 
    } catch (error) { return sendError(res,500,null,error.message) }  
}


const getSingleBus = async (req, res) => { 
    try {
        const id = req.id;
        const getBus = await busExist(id); 
        if(!getBus){
            return fail(res,404,null,'busNotExist',req)            
        }   
        return success(res,200,getBus,"Retrived",req);  
        /* c8 ignore next 2 */ 
    } catch (error) { return sendError(res,500,null,error.message); }
}


const deleteBus = async (req, res) => {
    try {
        const id = req.id;
        const bus = await busExist(id);
        if(!bus){
            return fail(res,404,null,'busNotExist',req);  
        }

        await buses.destroy({ where :  { id }});
        return success(res,200,1,'busDeleted',req); 
        /* c8 ignore next 2 */   
    } catch (error) { return sendError(res,500,null,error.message); }  
}



const updateBus = async (req, res) => {
    try {
        const id = req.id;
        const { bustype, routecode, platenumber } = req.body;

        const bus = await busExist(id);
        if(!bus){
            return fail(res,404,null,'busNotExist',req);  
        }

        const { error } = validateBusInput(req.body);
        if(error){
            return fail(res,400,null,error.details[0].message);
        }

        const plateNumberExist = await buses.findAll({where:{platenumber}});
        if(plateNumberExist.length > 0){ 
            return fail(res,400,null,"plateExist",req);
        }

        await buses.update({ bustype, routecode, platenumber } , { where :  { id }});
        return success(res,200,buses,'updated',req);
    /* c8 ignore next 2 */        
    } catch (error) { return sendError(res,500,null,error.message); }    
}


export { addBus,getAllBuses, getSingleBus, deleteBus, updateBus }