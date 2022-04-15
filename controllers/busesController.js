import { success,fail,sendError } from "../function/respond.js";
import { buses } from "../models"
import Sequelize from "sequelize";
import { validateBusInput, validateId } from '../function/validation';
import { paginate } from "../utils/paginate.js";

const { Op } = Sequelize;


const busExist = async (busId) =>{
    const getBus = await buses.findAll({ where: { id : busId } }); 
    if(getBus.length > 0) return getBus 
    return false
}

const addBus = async (req,res) => {
    try {
        const { error } = validateBusInput(req.body);
        if(error) return fail(res,400,null,error.details[0].message);
    
        const { bustype, routecode, platenumber } = req.body;
        const plateNumberExist = await buses.findAll({where:{platenumber}});
        if(plateNumberExist.length > 0) return fail(res,400,null,"Platenumber already exist");
    
        const createBus = await buses.create({ bustype, routecode, platenumber });
        return success(res,201,createBus,"Bus has been created");        
    } catch (error) {
        return sendError(res,500,null,error.message);        
    }  
}


const getAllBuses = async (req, res) => {    
    try {
        const dataPage = req.query.page;
        const dataSize = req.query.size;
        const { page , size } = paginate(dataPage,dataSize);
        const allBus = await buses.findAndCountAll({ limit: size, offset: page * size });           
        return success(res,200,{buses: allBus.rows , totalPage : Math.ceil(allBus.count / size)},"Retrived");        
    } catch (error) {
        return sendError(res,500,null,error.message);        
    }  
}


const getSingleBus = async (req, res) => { 
    try {
        const id = req.id;
        const getBus = await buses.findByPk(id); 
        if(getBus.length == 0){
            return fail(res,404,null,'Bus not found')            
        }   
        return success(res,200,getBus,"Retrived");  
    } catch (error) {
        return sendError(res,500,null,error.message);      
    }
}


const deleteBus = async (req, res) => {
    try {
        const id = req.id;
        const bus = await busExist(id);
        if(!bus) return fail(res,404,null,'Bus not found');  

        await buses.destroy({ where :  { id }});
        return success(res,200,buses,'Bus has been deleted'); 
    } catch (error) {
        return sendError(res,500,null,error.message);     
    }  
}



const updateBus = async (req, res) => {
    try {
        const id = req.id;
        const { bustype, routecode, platenumber } = req.body;

        const bus = await busExist(id);
        if(!bus) return fail(res,404,null,'Bus not found');  

        const { error } = validateBusInput(req.body);
        if(error) return fail(res,400,null,error.details[0].message);

        const plateNumberExist = await buses.findAll({where:{platenumber}});
        if(plateNumberExist.length > 0) return fail(res,400,null,"Platenumber already exist");

        await buses.update({ bustype, routecode, platenumber } , { where :  { id }});
        return success(res,200,buses,'Bus has been updated'); 
    } catch (error) {
        return sendError(res,500,null,error.message);  
    }    
}


export { addBus,getAllBuses, getSingleBus, deleteBus, updateBus }