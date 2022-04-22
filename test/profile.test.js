import chai,{ expect }  from "chai"
import chaiHTTP from "chai-http"
import { app } from "../app"
import db from "../models"
chai.should();
chai.use(chaiHTTP);

let token;
describe('update profile ', () => {
	before((done) => {
		db.users.destroy({
			truncate: true,
			restartIdentity: true,
		});
		done();
	});
	beforeEach(async () => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: 'cyifuzo',
			email: 'operator@andela.com',
			role: 'client',
			password: 'test123',
      // profileImage:"https://cdn.pixabay.com/photo/2022/02/23/09/46/woman-7030387__340.jpg"
		};
		await chai.request(app).post(`/api/v1/users/login/register`).send(user);
	});
	beforeEach(async () => {
		let user = {
			email: 'operator@andela.com',
			password: 'test123',
		};
		const response = await chai
			.request(app)
			.post('/api/v1/users/login')
			.send(user);

		token = response.body.data.token;
	});
	afterEach(async () => {
		await db.users.destroy({
			truncate: true,
			restartIdentity: true,
		});
	});

	it('should assign editProfile permission to the operator role', async () => {
		const response = await chai
			.request(app)
			.put(`/api/v1/profile`)
			.send({
				userId: 3,
				permissionid: 5,
			});
		response.body.should.be.a('object');
		response.body.should.have.property('status');
		// response.body.data.role.should.be.a('array');
		response.body.message.should.be.a('string');
		response.body.message.should.be.eql("Please login");
		expect(response).to.have.status(401);
	});


	it('Should access profile ', (done) => {
		chai
			.request(app)
			.put(`/api/v1/roles/assign/users`)
			.send({
				userId: 3,
        roleId: 2,
			})
			.end((err, res) => {
				chai
					.request(app)
					.put(`/api/v1/profile`)
					.set({
						userId: 3,
						action: 'editProfile',
						'auth-token': 'Bearer ' + token,
					})
					.end((err, res) => {
						chai.expect(res).to.have.status(401);
						chai
							.request(app)
							.delete(`/api/v1/roles/remove/users`)
							.send({
								userId: 3,
                roleId: 2,
							})
							.end((err, res) => {
								res.body.should.be.a('object');
								res.body.should.have.property('status');
								// res.body.data.should.be.a('object');
								res.body.message.should.be.a('string');
								res.body.message.should.be.eql("User does not exist");
								chai.expect(res).to.have.status(400);
								done();
							});
					});
			});
	});

});
