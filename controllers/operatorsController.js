import { operators } from '../models'
import { success,fail,sendError } from "../function/respond.js";
import sendMail from '../utils/sendEmail'
import { Sequelize } from '../models';
import { validateDriversOnCreate, validateDriverId } from '../function/validation'
import generator from 'generate-password'
import bcrypt from 'bcrypt'

const { Op } = Sequelize
const passwordNew = generator.generate({
	length: 10,
	numbers: true
});


const addOperator = async(req,res) => {
    const hashedPassword = await bcrypt.hash(passwordNew, 10);
    const { firstname, lastname, email, telephone } = req.body
    const { error } = validateDriversOnCreate({firstname:firstname, lastname:lastname, email:email, telephone:telephone})
    if(error) return fail(res,422,null,error.details[0].message) ;
    const operatorExist = await operators.findAll({
        where :{ 
            email:email
        }
    });
    if(operatorExist.length > 0) return fail(res,409,null,req.t('operatorExist'),req.t('fail'))
        operators.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            telephone: req.body.telephone,
            password: hashedPassword 
        }).then(operator => {
            sendMail(operator.email, req.t('emailMessage'), `${ req.t('pwdMsg')+" "+passwordNew}`)
            return success(res,201,operator,req.t('newOperator'),req.t('success'))
        }).catch((errors)=> {
            return sendError(res,500,errors,errors.message)
        })
}

const allOperators = async(req, res) => {
    let filter = {}
    let { q } = req.query

    if(q){
        filter = {
            where: {
                firstname: {
                    [Op.like]: `${q}%`
                }
            }
        }
    }
    try{
        operators.findAndCountAll({attributes: {exclude: ['password']}}).then((operators)=> {
            return success(res,200,operators,req.t('allOperators'), req.t('success'))
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}

const getSingleOperator = async(req, res) => {
    let { id } = req.params
    const { error } = validateDriverId({id})
    if(error) return fail(res,422,null,error.details[0].message) 
    const operatorExist = await operators.findAll({
        where :{ 
            id 
        }
    });
    if(operatorExist.length == 0) return fail(res,404,operatorExist,req.t('operatorNotFound'),req.t('fail'))
    try{
        operators.findByPk(id).then((operator)=> {
            return success(res,200,operator,req.t('singleOperator'),req.t('success'))
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}

const deleteOperator = async(req, res) => {
    let { id } = req.params
    const { error } = validateDriverId({id})
    if(error) return fail(res,422,null,error.details[0].message) 
    const operatorExist = await operators.findAll({
        where :{ 
            id 
        }
    });
    if(operatorExist.length == 0) return fail(res,404,operatorExist,req.t('operatorNotFound'),req.t('fail'))
    try{
        operators.findByPk(id).then((operator)=> {
            operator.destroy()
            return success(res,204,operator,"Operator deleted")
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}
const updateOperator = async(req, res) => {
    let { id } = req.params
    const { error } = validateDriverId({id})
    if(error) return fail(res,422,null,error.details[0].message) 
    const operatorExist = await operators.findAll({
        where :{ 
            id 
        }
    });
    if(operatorExist.length == 0) return fail(res,404,operatorExist,req.t('operatorNotFound'),req.t('fail'))
    try {
        operators.findByPk(id).then((operator) => {
            operator.update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                telephone: req.body.telephone,
                password: passwordNew  
            })
            return success(res,200,operator,req.t('DriverUpdated'),req.t('success'))
        })
    } catch(error){
        return sendError(res,500,null,error.message)
    }
}


export { 
    addOperator,
    allOperators, 
    getSingleOperator,
    deleteOperator,
    updateOperator
 }