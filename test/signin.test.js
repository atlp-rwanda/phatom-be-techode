const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const { users } = require('../models/users.js');
const db = require('../models');
chai.should();
chai.use(chaiHTTP);

describe('Test one : users', () => {
    before((done) => {
        db.users.destroy({
            where: {},
            truncate: true,
        });
        done();
    });
    


	it('should create with valid inputs ', (done) => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: 'chance',
			email: 'admin@andela.com',
			role: 'client',
			password: 'test123',
		};
        chai.request(app)
            .post('/api/v1/users/login/register')
            .send(user)
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
				done()
            });
            
    });
	it('should not create user without valid email ', (done) => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: 'chance',
			email: 'adminandela.com',
			role: 'client',
			password: 'test123',
		};
		chai.request(app)
			.post('/api/v1/users/login/register')
			.send(user)
			.end((err, res) => {
				chai.expect(res).to.have.status(400);
				done()
			});
			
	 });

	 it('should not create user wit spaced username', (done) => {
		const user = {
			fullname: 'cyifuzo jean damascene',
			username: ' ',
			email: 'admin@andela.com',
			role: 'client',
			password: 'test123',
		};
		chai.request(app)
			.post('/api/v1/users/login/register')
			.send(user)
			.end((err, res) => {
				chai.expect(res).to.have.status(500);
				done()
			});
			
	 });

    it('should not create a User without fullname', async () => {
        const user = {
            fullname: '',
            username: 'cyifuzo',
            email: 'admin@andela.com',
            role: 'client',
            password: 'test123',
        };
        const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
        expect(response).to.have.status(400);
    });

    it('should not create a User without username', async () => {
        const user = {
            fullname: 'cyifuzo jean damascene',
            username: '',
            email: 'admin@andela.com',
            role: 'client',
            password: 'test123',
        };
        const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
        expect(response).to.have.status(401);
    });

    it('should not create a User without password', async () => {
        const user = {
            fullname: 'cyifuzo jean damascene',
            username: 'chance',
            email: 'admin@andela.com',
            role: 'client',
            password: '',
        };
        const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
        expect(response).to.have.status(401);
    });

    it('should not create a one User twice', async () => {
     const user = {
         fullname: 'cyifuzo jean damascene',
         username: 'chance',
         email: 'admin@andela.com',
         role: 'client',
         password: 'test123',
     };
     const response = await chai.request(app).post(`/api/v1/users/login/register`).send(user);
     expect(response).to.have.status(409);
    });

	it('should not login without spaced password', (done) => {
        let user = {
            email: 'admin@andela.com',
            password: ' ',
        }
        chai.request(app)
            .post('/api/v1/users/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res).to.have.status(500);
				done()
            });
            
    });

    it('should login with valid email and password', (done) => {
        let user = {
            email: 'admin@andela.com',
            password: 'test123',
        }
        chai.request(app)
            .post('/api/v1/users/login')
            .send(user)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });
            
    });

    it('should not login with invalid email or password', async () => {
        const user = {
            email: 'admin11@andela.com',
            password: 'test123',
        };
        const response = await chai.request(app).post(`/api/v1/users/login`).send(user);
        expect(response).to.have.status(401);
    });

    it('should not login without email', async () => {
        const user = {
            email: '',
            password: 'test123',
        };
        const response = await chai.request(app).post(`/api/v1/users/login`).send(user);
        expect(response).to.have.status(401);
    });

    it('should not login without password', async () => {
        const user = {
            email: 'admin11@andela.com',
            password: '',
        };
        const response = await chai.request(app).post(`/api/v1/users/login`).send(user);
        expect(response).to.have.status(401);
    });
});