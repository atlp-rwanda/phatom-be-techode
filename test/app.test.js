import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
import User from '../models/user.js';
const should = chai.should();

chai.use(chaiHttp);
chai.should();

describe('Test one : users', () => {
	before( (done) => {
    app.on("Started", () => {
      User.clear()
      done();
    })	
	});

  it('should create a User', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/users`).send(user);
		expect(response).to.have.status(201);
	});

  it('should Retieve all users', async () => {
		const response = await chai.request(app).get(`/users`)
		expect(response).to.have.status(200);
	});

	it('Backend root director test', (done) => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				res.should.have.status(200);
				done();
			});
	});

});
