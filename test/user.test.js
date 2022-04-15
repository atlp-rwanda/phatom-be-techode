const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const { users } = require('../models');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : users', () => {
	before((done) => {
		users.destroy({
			where: {
				where: { isDeleted: false },
			},
			truncate: true,
		});
		done();
	});
	it('should create a User', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
			password: 'test123',
<<<<<<< HEAD
			email: 'delcy@gmail.com',
=======
			profileImage: 'https://cdn.pixabay.com/photo/2018/03/15/23/16/car-3229816__480.jpg',
>>>>>>> ft(profile): update profile
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(201);
	});

/*============= user profile test ============*/

	it("should create a User's profile", async () => {
		const user = {
			profileImage: 'https://cdn.pixabay.com/photo/2018/03/15/23/16/car-3229816__480.jpg',
		};
		const response = await chai.request(app).post(`/api/v1/profile/register`).send(user);
		expect(response).to.have.status(201);
	});
	it("should not create a User's profile without image link", async () => {
		const user = {
			profileImage: '',
		};
		const response = await chai.request(app).post(`/api/v1/profile/register`).send(user);
		expect(response).to.have.status(500);
	});
	// it('should update a route', async () => {
	// 	const id = '1'
	//     const oneRoute = {
    //         name: "Karuruma - Kanombe",
    //         code: "507",
    //         city: "Rwamagana",
    //         startLocation: "Rwamagan",
    //         endLocation: "Kanombmmne",
    //         duration: "40",
    //         distance: "1231"
    //     };
	// 	const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute);
	// 	expect(response).to.have.status(200);
	// });

	it('should update user with valid id', async () => {
		
		const id = '2'
		const user = {
			profileImage: 'https://cdn.pixabay.com/photo/2018/03/15/23/16/car-3229816__480.jpg',
		};
		const response = await chai.request(app).put(`/api/v1/profile/${id}`).send(user);
		expect(response).to.have.status(500);
	});

	it('should not update user with invalid id', async () => {
		const id = 'cyifuzo'
		const response = await chai.request(app).put(`/api/v1/profile/${id}`)
		expect(response).to.have.status(500);
	})


	it('should not create a User without password', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(400);
	});

	it('should not create a User without password', async () => {
		const user = {};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(500);
	});

	it('should Retieve all users', async () => {
		const response = await chai.request(app).get(`/api/v1/users`);
		expect(response).to.have.status(200);
	});

	it('should generate token', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/token`);
		expect(response).to.have.status(200);
	});
	it('should logout from account', async () => {
		const response = await chai.request(app).get(`/api/v1/dashboard/logout`);
		expect(response).to.have.status(404);
	});
<<<<<<< HEAD
=======


>>>>>>> ft(profile): update profile
});
