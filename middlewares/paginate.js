import { users } from "../models";
import { success,fail,sendError } from "../function/respond.js";
import { getPaginatedUsers } from "../controllers/userController";


const paginate = (model) => {
	return async (req, res, next) => {
	try{
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const result = {}

		model.findAll().then(data => {
		/* c8 ignore next 18 */
		if(endIndex < model.length){
			result.next = {
				page: page + 1,
				limit: limit
			}
		}
		if(startIndex > 0){
			result.previous = {
				page: page - 1,
				limit: limit
			}
		}
		result.results = data.slice(startIndex, endIndex);
		return success(res,200,result,"paginated list", req)
		next();
	})
	} catch(err) { return sendError(res, 500, null, err.message, req) }
}
}
export default paginate