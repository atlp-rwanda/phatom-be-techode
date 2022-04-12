const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const drivers = require('../models/drivers.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : drivers', () => {
	before((done) => {
		db.drivers.destroy({
			where: {},
			truncate: true,
		});
		done();
	});
	it('should create a Driver', async () => {
		const driver = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'johndoe@gmail.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/drivers/register`).send(driver);
		expect(response).to.have.status(201);
	});

	it('should not create an existing Driver', async () => {
		const driver = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'johndoe@gmail.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/drivers/register`).send(driver);
		expect(response).to.have.status(409);
	});

	it('should not create a Driver without email', async () => {
		const driver = {
			firstname: 'John',
            lastname: 'Doe',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/drivers/register`).send(driver);
		expect(response).to.have.status(422);
	});

	it('should not create a Driver without email', async () => {
    const driver = {};
		const response = await chai.request(app).post(`/api/v1/drivers/register`).send(driver);
		expect(response).to.have.status(422);
	});

	it('should Retrieve all drivers', async () => {
		const response = await chai.request(app).get(`/api/v1/drivers`);
		expect(response).to.have.status(200);
	});
	it('should return an validation errors error', async () => {
		const id = '19a'
		const response = await chai.request(app).get(`/api/v1/drivers/${id}`)
		expect(response).to.have.status(422);
	})
	it('should Return not found if an id does not exist', async () => {
		const id = '1944'
		const response = await chai.request(app).get(`/api/v1/drivers/${id}`)
		expect(response).to.have.status(404);
	})

	it('should Return a single driver', async () => {
		const id = '1'
		const response = await chai.request(app).get(`/api/v1/drivers/${id}`)
		expect(response).to.have.status(200);
	})
	it('should return validation errors errors on invalid delete', async () => {
		const id = 'null'
		const response = await chai.request(app).delete(`/api/v1/drivers/${id}`)
		expect(response).to.have.status(422);
	})

	it('should Return not found if an id does not exist', async () => {
		const id = '1944'
		const response = await chai.request(app).delete(`/api/v1/drivers/${id}`)
		expect(response).to.have.status(404);
	})

	it('should not update a Driver without an id', async () => {
		const id = 'waka'
		const driver = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'waka.florien45@gmail.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).put(`/api/v1/drivers/${id}`).send(driver);
		expect(response).to.have.status(422);
	});

	it('should not update a Driver without email', async () => {
		const id = '1999'
		const driver = {
			firstname: 'John',
            lastname: 'Doe',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).put(`/api/v1/drivers/${id}`).send(driver);
		expect(response).to.have.status(404);
	});

	it('should update a Driver with email', async () => {
		const id = '1'
		const driver = {
			firstname: 'John',
            lastname: 'Doe',
			email: 'waka.florien45@gmail.com',
            telephone: '0786478846463',
			password: 'test123',
		};
		const response = await chai.request(app).put(`/api/v1/drivers/${id}`).send(driver);
		expect(response).to.have.status(200);
	});

	it('should delete a driver', async () => {
		const id = '1'
		const response = await chai.request(app).delete(`/api/v1/drivers/${id}`)
		expect(response).to.have.status(204);
	})
});

