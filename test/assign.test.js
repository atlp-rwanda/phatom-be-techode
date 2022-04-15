import chai,{ expect }  from "chai"
import chaiHTTP from "chai-http"
import { app } from "../app"
import db from "../models"
chai.should();
chai.use(chaiHTTP);



let token;
describe("Test: tests bus assignment to route ", () =>{

	beforeEach(async () => {
		const response = await chai
			.request(app)
			.get('/api/v1/dashboard/token');

		token = response.body.data;
	});

	it(' it should  assign  bus to routes', async () => {
	
		const response = await chai
			.request(app)
			.post(`/api/v1/assign/bus-to-route/RAD000X/401`).set({'auth-token': token})
			
		
			response.body.should.be.a('object');
			response.body.should.have.property('status');
			response.body.data.should.be.a('object');
			response.body.message.should.be.a('string');
			response.body.message.should.be.eql("Bus assigned successfully");
		chai.expect(response).to.have.status(200);
		
		
	});

	it(' it should not assign  bus to routes we have invalid entry', async () => {
	
		const response = await chai
			.request(app)
			.post(`/api/v1/assign/bus-to-route/1/1`).set({'auth-token': token})
			
			response.body.should.be.a('object');
			response.body.should.have.property('status');
			response.body.message.should.be.a('string');
			response.body.message.should.be.eql("code length must be at least 3 characters long");
		chai.expect(response).to.have.status(400);
		
		
	});

	it(' it should  remove assigned route', async () => {
	
		const response = await chai
			.request(app)
			.put(`/api/v1/assign/bus-to-route/RAD000X`).set({'auth-token': token})
			
		
			response.body.should.be.a('object');
			response.body.data.should.be.a('object');
			response.body.message.should.be.a('string');
			response.body.message.should.be.eql("Bus assignment removed successfully");
		chai.expect(response).to.have.status(200);
		
		
	});

	it(' it should not remove assigned route id bus does not exist', async () => {
	
		const response = await chai
			.request(app)
			.put(`/api/v1/assign/bus-to-route/RAD00asdfadsfX`).set({'auth-token': token})
			
		
			response.body.should.be.a('object');
			response.body.message.should.be.a('string');
			response.body.message.should.be.eql("bus does not exist");
		chai.expect(response).to.have.status(404);
		
		
	});

	it(' it should not remove assigned route if route does is invalid', async () => {
	
		const response = await chai
			.request(app)
			.put(`/api/v1/assign/bus-to-route/kl`).set({'auth-token': token})
			
		
			response.body.should.be.a('object');
			response.body.should.have.property('status');
			response.body.should.have.property('data');
			response.body.message.should.be.a('string');
		    chai.expect(response).to.have.status(400);
		
		
	});
	
	
	
	
	it(' it should  assign route to  if route does not exist', async () => {
		
		const response = await chai
			.request(app)
			.post(`/api/v1/assign/bus-to-route/RAD000X/403`).set({'auth-token': token})		
			response.body.should.be.a('object');
			response.body.should.have.property('status');
			response.body.message.should.be.a('string');
			response.body.message.should.be.eql("Route does not exist");
		chai.expect(response).to.have.status(404);
		
	});
	
	
	it(' it should not assign bus to route if bus doe not exist', async () => {		
		const response = await chai
			.request(app)
			.post(`/api/v1/assign/bus-to-route/RAD00fwY/401`).set({'auth-token': token})		
		
			response.body.should.be.a('object');
			response.body.should.have.property('status');
			response.body.message.should.be.a('string');
			response.body.message.should.be.eql("bus does not exist");
		chai.expect(response).to.have.status(404);
		
	});
})

