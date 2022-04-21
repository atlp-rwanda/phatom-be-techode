const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const route = require('../models/route.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : router', () => {
	before((done) => {
		db.route.destroy({
			where: {},
			truncate: true,
		});
		done();
	});
	it('should create a route', async () => {
		const oneRoute = {
            name: "Karuruma - Gatsata",
            code: "5000",
            city: "Rwamagana3",
            startLocation: "Rwamagan4a",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute);
		expect(response).to.have.status(201);
	});
	it('should not create already created route', async () => {
        const oneRoute = {
            name: "Karuruma - Gatsata",
            code: "5000",
            city: "Rwamagana3",
            startLocation: "Rwamagan4a",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute);
		expect(response).to.have.status(409);
	});
	it('should not create a route without code', async () => {
        const oneRoute = {
            name: "Karuruma - Gatsata",
            city: "Rwamagana3",
            startLocation: "Rwamagan4a",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute);
		expect(response).to.have.status(422);
	});

	it('should not create a route without data', async () => {
    const oneRoute = {};
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute);
		expect(response).to.have.status(422);
	});

	it('should Retrieve all routes', async () => {
		const response = await chai.request(app).get(`/api/v1/routes`);
		expect(response).to.have.status(200);
	});

	it('should not return a single route for id that does not exist', async () => {
		const id = '198'
		const response = await chai.request(app).get(`/api/v1/routes/${id}`)
		expect(response).to.have.status(404);
	})
	
	it('should return an validation errors error', async () => {
		const id = '19a'
		const response = await chai.request(app).get(`/api/v1/routes/${id}`)
		expect(response).to.have.status(422);
	})
	it('should Return a single route', async () => {
		const id = '1'
		const response = await chai.request(app).get(`/api/v1/routes/${id}`)
		expect(response).to.have.status(200);
	})
	it('should return validation errors on invalid delete', async () => {
		const id = 'null'
		const response = await chai.request(app).delete(`/api/v1/routes/${id}`)
		expect(response).to.have.status(422);
	})
	it('should Return not found if an id does not exist', async () => {
		const id = 1944
		const response = await chai.request(app).delete(`/api/v1/routes/${id}`)
		expect(response).to.have.status(404);
	})
	it('should not update a route without code', async () => {
		const id = 1999
        const oneRoute = {
            name: "Karuruma - Gatsata",
            city: "Rwamagana3",
            startLocation: "Rwamagan4a",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute);
		expect(response).to.have.status(404);
	});

	it('should not update a Operator without an id', async () => {
		const id = 'test'
        const oneRoute = {
            name: "Karuruma - Gatsata",
            code: "5000",
            city: "Rwamagana3",
            startLocation: "Rwamagan4a",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute);
		expect(response).to.have.status(422);
	});

	it('should update a route', async () => {
		const id = '1'
	    const oneRoute = {
            name: "Karuruma - Kanombe",
            code: "507",
            city: "Rwamagana",
            startLocation: "Rwamagan",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute);
		expect(response).to.have.status(200);
	});

	it('should delete a route', async () => {
		const id = '1'
		const response = await chai.request(app).delete(`/api/v1/routes/${id}`)
		expect(response).to.have.status(200);
	})
});