import chai from 'chai'
import chaiHTTP from 'chai-http'
import { app } from '../app'
import { expect } from 'chai'
import route from '../models/route.js';
import db from '../models'
chai.should();
chai.use(chaiHTTP);

let token;
describe('Test one : router', () => {
	before((done) => {
		db.route.destroy({
			where: {},
			truncate: true,
			restartIdentity: true,
		});
		done();
	});

	beforeEach(async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/dashboard/token');

		token = response.body.data;
	});

	afterEach(async () => {
		await db.users.destroy({
			truncate: true,
			restartIdentity: true,
		});
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
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.data.should.be.a('object');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route Created");
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
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route already exist");
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
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.should.have.property('message');
		response.body.message.should.be.a('string');
		expect(response).to.have.status(422);
	});

	it('should not create a route without data', async () => {
    const oneRoute = {};
		const response = await chai.request(app).post(`/api/v1/routes/register`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.should.have.property('message');
		response.body.message.should.be.a('string');
		expect(response).to.have.status(422);
	});

	it('should Retrieve all routes', async () => {
		const response = await chai.request(app).get(`/api/v1/routes`);
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.data.should.be.a('object');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("All routes");
		expect(response).to.have.status(200);
	});

	it('should not return a single route for id that does not exist', async () => {
		const id = '198'
		const response = await chai.request(app).get(`/api/v1/routes/${id}`)
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route not found");
		expect(response).to.have.status(404);
	})

	it('should not return a single route for id that does not exist', async () => {
		const id = 'test19'
		const response = await chai.request(app).get(`/api/v1/routes/${id}`)
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql('id must be a number');
		expect(response).to.have.status(400);
	})
	
	it('should return an validation errors error', async () => {
		const id = '19a'
		const response = await chai.request(app).get(`/api/v1/routes/${id}`)
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql('id must be a number');
		expect(response).to.have.status(400);
	})
	it('should Return a single route', async () => {
		const id = '1'
		const response = await chai.request(app).get(`/api/v1/routes/${id}`)
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.data.should.be.a('object');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Single route");
		expect(response).to.have.status(200);
	})
	it('should return validation errors on invalid delete', async () => {
		const id = 'null'
		const response = await chai.request(app).delete(`/api/v1/routes/${id}`).set({'auth-token': token})
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql('id must be a number');
		expect(response).to.have.status(400);
	})
	it('should Return not found if an id does not exist', async () => {
		const id = 1944
		const response = await chai.request(app).delete(`/api/v1/routes/${id}`).set({'auth-token': token})
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route not found");
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
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route not found");
		expect(response).to.have.status(404);
	});

	it('should not update a route without name', async () => {
		const id = 1999
        const oneRoute = {
            code: "204",
            city: "Rwamagana",
            startLocation: "Rwamagana",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route not found");
		expect(response).to.have.status(404);
	});

	it('should not update a route without an id', async () => {
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
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql('id must be a number');
		expect(response).to.have.status(400);
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
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.data.should.be.a('object');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route updated");
		expect(response).to.have.status(200);
	});

	it('should delete a route', async () => {
		const id = '1'
		const response = await chai.request(app).delete(`/api/v1/routes/${id}`).set({'auth-token': token})
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.data.should.be.a('object');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Route deleted");
		expect(response).to.have.status(200);
	})

	it('should update a route', async () => {
		const id = 'test'
	    const oneRoute = {
            name: "Karuruma - Kanombe",
            code: "507",
            city: "Rwamagana",
            startLocation: "Rwamagan",
            endLocation: "Kanombmmne",
            duration: "40",
            distance: "1231"
        };
		const response = await chai.request(app).put(`/api/v1/routes/${id}`).send(oneRoute).set({'auth-token': token});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		response.body.should.have.property('data');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql('id must be a number');
		expect(response).to.have.status(400);
	});


});