<<<<<<< HEAD
import { routes, buses  } from '../models';
=======
import { routes  } from '../models';
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
import { success, fail, sendError } from '../function/respond.js';
import {
	validateRoutesOnCreate,
} from '../function/validation';
import { paginate } from '../utils/paginate.js';

const addRoute = async (req, res) => {
    const { name, code, city, startLocation, endLocation, duration, distance } = req.body;
    const routeExist = await routes.findAll({ where: { code } });
	 if (routeExist.length > 0) {
		 return fail(res, 409, null, 'routeExist', req);
	 }
	 routes.create({
	 		name,
	 		code,
	 		city,
	 		startLocation,
	 		endLocation,
	 		duration,
	 		distance,
	 	})
		 .then((oneRoute) => {
			 return success(res, 201, oneRoute, 'newRoute', req);
		 })
		/* c8 ignore next 1*/
		 .catch((errors) => { return sendError(res, 500, errors, errors.message); });

        }; 

const allRoutes = async(req, res) => {
    try{
        const { page: dataPage , size: dataSize } = req.query
        const { page, size } = paginate(dataPage, dataSize);
        routes.findAndCountAll({ limit: size, offset: page * size }).then((oneRoute)=> {
            return success(res,200,{routes: oneRoute.rows , totalPage : Math.ceil(oneRoute.count / size)},'allRoutes',req)
    })
    /* c8 ignore next 1*/
    } catch(error){return sendError(res,500,null,error.message)}

}

const getSingleRoute = async(req, res) => {
    try{
        let { id } = req.params

<<<<<<< HEAD
        const oneRoute = await routes.findByPk(id, { include: [buses]})
=======
        const oneRoute = await routes.findByPk(id)
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
        if(oneRoute){
            return success(res,200,oneRoute,'singleRoute',req)
        } else {
            return fail(res,404,oneRoute,'routeNotFound',req)
        }
        /* c8 ignore next 1*/
    } catch(error){return sendError(res,500,null,error.message)}

}

const deleteRoute = async(req, res) => {
    let { id } = req.params

    try{

        const oneRoute = await routes.findByPk(id)
        if(oneRoute){
            oneRoute.destroy()
            return success(res,200,oneRoute,"routeDeleted",req)
        } else {
            return fail(res,404,oneRoute,'routeNotFound',req)
        }

        /* c8 ignore next 1*/
    } catch(error){ return sendError(res,500,null,error.message) }

}

const updateRoute = async(req, res) => {
    try {
        let { id } = req.params
        const { name, code, city, startLocation, endLocation, duration, distance } = req.body;
        const oneRoute = await routes.findByPk(id)
        if(oneRoute){
            oneRoute.update({
                name,
                code,
                city,
                startLocation,
                endLocation,
                duration,
                distance,
            })
            return success(res,200,oneRoute,'routeUpdated',req)
        } else {
            return fail(res,404,oneRoute,'routeNotFound',req)
        }
        /* c8 ignore next 1*/
    } catch(error){ return sendError(res,500,null,error.message) }

}

export { addRoute, allRoutes, getSingleRoute, deleteRoute, updateRoute };
