import { route } from '../models';
import { success, fail, sendError } from '../function/respond.js';
import {
	validateRoutesOnCreate,
    validateRouteId
} from '../function/validation';
import { paginate } from '../utils/paginate.js';


const addRoute = async (req, res) => {

    const { name, code, city, startLocation, endLocation, duration, distance } = req.body;
	const { error } = validateRoutesOnCreate({name: name, code: code, city: city, startLocation: startLocation, endLocation: endLocation, duration: duration, distance: distance })
	if(error) return fail(res,422,null,error.details[0].message);
   
	const routeExist = await route.findAll({
		where: {
			code: code,
		},
	});
	if (routeExist.length > 0) {
		return fail(res, 409, null, 'Route Exist', req);
	}
	route.create({
			name: req.body.name,
			code: req.body.code,
			city: req.body.city,
			startLocation: req.body.startLocation,
			endLocation: req.body.endLocation,
			duration: req.body.duration,
			distance: req.body.distance,
		})
		.then((oneRoute) => {
			return success(res, 201, oneRoute, 'new route', req);
		})
		/* c8 ignore next 1*/
		.catch((errors) => { return sendError(res, 500, errors, errors.message); });
};

// const allBus = await buses.findAndCountAll({ limit: size, offset: page * size });           
// return success(res,200,{buses: allBus.rows , totalPage : Math.ceil(allBus.count / size)},"Retrived",req);        

const allRoutes = async(req, res) => {
   
    try{
        const dataPage = req.query.page;
        const dataSize = req.query.size;
        const { page, size } = paginate(dataPage, dataSize);
        route.findAndCountAll({ limit: size, offset: page * size }).then((oneRoute)=> {
            return success(res,200,{routes: oneRoute.rows , totalPage : Math.ceil(oneRoute.count / size)},'allRoutes',req)
    })
//         const manyRoutes = await route.findAndCountAll({ limit: size, offset: page * size });           
// return success(res,200,{routes: manyRoutes.rows , totalPage : Math.ceil(manyRoutes.count / size)},"allRoutes",req); 
     
        /* c8 ignore next 1*/
    } catch(error){return sendError(res,500,null,error.message)}
}

const getSingleRoute = async(req, res) => {
    try{
        let { id } = req.params
        const { error } = validateRouteId({id})
        if(error){
            return fail(res,422,null,error.details[0].message) 
        }
        const routeExist = await route.findAll({
            where :{ 
                id 
            }
        });
    if(routeExist.length == 0){
        return fail(res,404,routeExist,'RouteNotFound',req)
    }
        route.findByPk(id).then((oneRoute)=> {
            return success(res,200,oneRoute,'Single route',req)
        })
        /* c8 ignore next 1*/
    } catch(error){return sendError(res,500,null,error.message)}
}

const deleteRoute = async(req, res) => {
    let { id } = req.params
    const { error } = validateRouteId({id})
    if(error) {
        return fail(res,422,null,error.details[0].message) 
    }
    const routeExist = await route.findAll({
        where :{ 
            id 
        }
    });
    if(routeExist.length == 0){
        return fail(res,404,routeExist,'RouteNotFound',req)
    }
    try{
        route.findByPk(id).then((oneRoute)=> {
            oneRoute.destroy()
            return success(res,200,oneRoute,"Route deleted",req)
            // return success(res,200,oneRoute,'Single route',req)
        })
        /* c8 ignore next 1*/
    } catch(error){ return sendError(res,500,null,error.message) }
}

const updateRoute = async(req, res) => {
    try {
        let { id } = req.params
        const { error } = validateRouteId({id})
        if(error){
            return fail(res,422,null,error.details[0].message) 
        }
        const routeExist = await route.findAll({
            where :{ 
                id 
            }
        });
        if(routeExist.length == 0){
            return fail(res,404,routeExist,'RouteNotFound',req)
        }
        route.findByPk(id).then((oneRoute) => {
            oneRoute.update({
                name: req.body.name,
                code: req.body.code,
                city: req.body.city,
                startLocation: req.body.startLocation,
                endLocation: req.body.endLocation,
                duration: req.body.duration,
                distance: req.body.distance,
            })
            return success(res,200,oneRoute,'RouteUpdated',req)
        })
        /* c8 ignore next 1*/
    } catch(error){ return sendError(res,500,null,error.message) }
}

export { addRoute, allRoutes, getSingleRoute, deleteRoute, updateRoute };
