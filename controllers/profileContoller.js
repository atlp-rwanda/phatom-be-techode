import { users, profile } from "../models";
import { success, fail, sendError } from "../function/respond.js";


const createProfile = async (req, res) => {
	try {

		/* =============================== start: Validation ============================== */
		if (!req.body.profileImage) throw new Error('profile image link required');
		/* ================================= End: Validation ============================== */

		/* =========== start: User creation ================ */
		const newUser = users.create(req.body);
		const { profileImage } = req.body;
		return success(res, 201, { profileImage }, "profilePic", req);
		/* =========== start: User creation ============== */
	} catch (error) {
		return sendError(res, 500, null, error.message);
	}
};


const updateProfile = async (req, res) => {
	try {
		const { profileImage } = req.body
		const profile_id = req.params.id
		const updatedProfile = await users.findOne({ where: { id: profile_id } })

		updatedProfile.profileImage = profileImage

		await updatedProfile.save()

		return success(res, 200, { updatedProfile: profileImage }, "updateProfile", req);

	} catch (err) {
		console.log(err)
		return res.status(500).json({ error: 'Something went wrong' })
	}
};

export { createProfile, updateProfile };