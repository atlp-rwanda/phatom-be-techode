import { fail, success } from '../function/respond';
import { validateBusAssignRouteEntry, validatePlate } from '../function/validation';
import { buses as busModel, routes as routeModel } from '../models';

export const Assign = async (req, res) => {
	try {
		const { plate, code } = req.params;
		const { error } = validateBusAssignRouteEntry({plate,code});
		if(error) {
			return fail(res,400,null,error.details[0].message);
		}
		const bus = await busModel.findOne({
			where: {
				platenumber: plate,
			},
		});
		const route = await routeModel.findOne({
			where: {
				code: code,
			},
		});
		if (!bus) return fail(res, 404, null, 'busNotExist', req);
		if (!route) return fail(res, 404, null, 'routeNotExist', req);

		bus.routeId = route.id;
		bus.routecode = route.code;
		await bus.save();
		return success(res, 200, bus, 'busAssignedSuccessfully', req);
		/* c8 ignore next 1 */			
	} catch (error) { return res.status(500).json({ error: error.message })	}
};

export const removeBus = async (req, res) => {
	try {
		const { plate } = req.params;
		const { error } = validatePlate({plate})
		if(error) {
			return fail(res,400,null,error.details[0].message);
		}
		const bus = await busModel.findOne({
			where: {
				platenumber: plate,
			},
		});
		if (!bus){
			return fail(res, 404, null, 'busNotExist', req);
		}
		bus.routeId = null;
		await bus.save();
		return success(res, 200, bus, 'busreAssignedSuccessfully', req);
		/* c8 ignore next 1 */			
	}catch (error) { return res.status(500).json({ error: error.message })	}
	
};
