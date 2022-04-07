import { drivers } from '../models'
import { success,fail,sendError } from "../function/respond.js";
import sendMail from '../utils/sendEmail'
import Sequelize from "sequelize"
import { validateDriversOnCreate, validateDriverId } from '../function/validation'
import generator from 'generate-password'
import bcrypt from 'bcrypt'

const { Op } = Sequelize
const passwordNew = generator.generate({
	length: 10,
	numbers: true
});


const addDriver = async(req,res) => {

        const hashedPassword = await bcrypt.hash(passwordNew, 10);

        const { firstname, lastname, email, telephone } = req.body
        const { error } = validateDriversOnCreate({firstname:firstname, lastname:lastname, email:email, telephone:telephone})
        if(error) return fail(res,422,null,error.details[0].message) ;
        const driverExist = await drivers.findAll({
            where :{ 
                email:email
            }
        });
        if(driverExist.length > 0) return fail(res,409,null,req.t('DriverExist'),req.t('fail'))
        drivers.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            telephone: req.body.telephone,
            password: hashedPassword 
        }).then(driver => {
            sendMail(driver.email, req.t('emailMessage'),`${ req.t('pwdMsg')+" "+passwordNew}`)
            return success(res,201,driver,req.t('newDriver'),req.t('success'))
        }).catch((errors)=> {
            return sendError(res,500,errors,errors.message)
        })
}

const allDrivers = async(req, res) => {
    let filter = {}
    let {q} = req.query
    if(q){
        filter = {
            where: {
                firstname: {
                    [Op.like]: `${q}%`
                }
            },
            attributes: {exclude: ['password']}
        }
    }
    try{
        drivers.findAndCountAll({attributes: {exclude: ['password']}}).then((drivers)=> {
            return success(res,200,drivers,req.t('allDrivers'), req.t('success'))
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}

const getSingleDriver = async(req, res) => {
    let { id } = req.params
    const { error } = validateDriverId({id})
    if(error) return fail(res,422,null,error.details[0].message) 
    const driverExist = await drivers.findAll({
        where :{ 
            id 
        }
    });
    if(driverExist.length == 0) return fail(res,404,driverExist,req.t('DriverNotFound'),req.t('fail'))
    try{
        drivers.findByPk(id).then((driver)=> {
            return success(res,200,driver,req.t('Single driver'),req.t('success'))
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}

const deleteDriver = async(req, res) => {
    let { id } = req.params
    const { error } = validateDriverId({id})
    if(error) return fail(res,422,null,error.details[0].message) 
    const driverExist = await drivers.findAll({
        where :{ 
            id 
        }
    });
    if(driverExist.length == 0) return fail(res,404,driverExist,req.t('DriverNotFound'),req.t('fail'))
    try{
        drivers.findByPk(id).then((driver)=> {
            driver.destroy()
            return success(res,204,driver,"Driver deleted")
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}
const updateDriver = async(req, res) => {
    let { id } = req.params
    const { error } = validateDriverId({id})
    if(error) return fail(res,422,null,error.details[0].message) 
    const driverExist = await drivers.findAll({
        where :{ 
            id 
        }
    });
    if(driverExist.length == 0) return fail(res,404,driverExist,req.t('DriverNotFound'),req.t('fail'))
    try {
        drivers.findByPk(id).then((driver) => {
            driver.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                telephone: req.body.telephone,  
                password: passwordNew
            })
            return success(res,200,driver,req.t('operatorUpdated'),req.t('success'))
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}


export { 
    addDriver,
    allDrivers, 
    getSingleDriver,
    deleteDriver,
    updateDriver
 }