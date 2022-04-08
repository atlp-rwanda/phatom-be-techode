const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const { roles } = require('../models');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Roles testing', () => {
	before((done) => {
        roles.destroy({
			where: { isDeleted : false },
			truncate: true,
		});
		done();
	});

	it('should Retieve all roles', async () => {
		const response = await chai.request(app).get(`/api/v1/roles`);
		expect(response).to.have.status(200);
	});

    it('should not create role with empty field', async () => {
		const response = await chai.request(app).post(`/api/v1/roles`);
		expect(response).to.have.status(400);
	});

    // it('should create role', async () => {
	// 	const response = await chai.request(app).post(`/api/v1/roles`).send({ rolename: "testAdmingfx" });
	// 	expect(response).to.have.status(201);
	// });

    // it('should not access create route without userid', async () => {
	// 	const response = await chai.request(app).post(`/api/v1/roles/createAccessTest`).set({ userId: 2 });
	// 	expect(response).to.have.status(400);
	// });

    it('should not access create route without userid', async () => {
		const response = await chai.request(app).post(`/api/v1/roles/createAccessTest`).set({ action: "getRoute" });
		expect(response).to.have.status(400);
	});
});
