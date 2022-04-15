import { users } from "../models";
import { validateProfile } from "../function/validation";
import { success, fail, sendError } from "../function/respond.js";
 
/* c8 ignore next 13 */
const updateProfile = async (req, res) => {
	try {
		const { profileImage } = req.body
		const profile_id = req.userId 
		const { error } = validateProfile({ id: profile_id, profileImage })
		if (error) return fail(res, 422, null, error.details[0].message);
		const updatedProfile = await users.findOne({ where: { id: profile_id } })
		if (updatedProfile) {
			updatedProfile.profileImage = profileImage
			await updatedProfile.save()
			return success(res, 200, { updatedProfile: profileImage }, "updateProfile", req);
		}
		return fail(res, 400,null, "userExist", req);
		/* c8 ignore next 1 */ 
	} catch (err) {return fail(res, 500,null, 'Something went wrong')}};

export { updateProfile };