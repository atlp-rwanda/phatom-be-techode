const chai = require('chai');
const chaiHTTP = require('chai-http');
const { app } = require('../app');
const { expect } = require('chai');
const { roles } = require('../models');
const db = require('../models');
const { getRolesPermission } = require('../controllers/rolesController');
chai.should();
chai.use(chaiHTTP);

describe('Roles testing', () => {
	before((done) => {
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

    it('should create role', async () => {
		const response = await chai.request(app).post(`/api/v1/roles`).send({ rolename: "testAdmingfx" });
		expect(response).to.have.status(201);
	});

    it('Shoud prompt an error, if user id is not provided ', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/createAccessTest`)
            .set({ action : "createRoute"})
            .end((err, res) => {
                chai.expect(res).to.have.status(500);
				done()
            });            
    });


    
    it('Should prompt an error, if permission  provided  does not exist', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/createAccessTest`)
            .set({ userId : 2 , action : "createRouteuyfgu"})
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });



    it('Should prompt an error, if user id  provided  does not exist', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/createAccessTest`)
            .set({ userId : 1365423 , action : "createRoute"})
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });
    
});


describe("Access control testing", () => {
    before((done) => {
		done();
	});
    it('Should get list of roles', (done) => {
        chai.request(app)
            .get(`/api/v1/roles`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should not create role without rolename provided', (done) => {
        chai.request(app)
            .post(`/api/v1/roles`)
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });
    
    it('Should  create role with role name ', (done) => {
        chai.request(app)
            .post(`/api/v1/roles`)
            .send({rolename:"default"})
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
				done()
            });            
    });

    it('Should not delete role which does not exist', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/602`)
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should delete role', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/3`)
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should  not delete role without param id', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/ `)
            .end((err, res) => {
                chai.expect(res).to.have.status(404);
				done()
            });            
    });

    it('Should not assign permission whose role does not exist', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/permission/assign`)
            .send({
                "roleid": 15,
                "permissionid": 6
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign permission which does not exist', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/permission/assign`)
            .send({
                "roleid": 1,
                "permissionid": 854
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should  assign permission', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/permission/assign`)
            .send({
                "roleid": 1,
                "permissionid": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should not remove permission which does not exist', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/permission/remove`)
            .send({
                "roleid": 1,
                "permissionid": 2315
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not permission whose does not exist', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/permission/remove`)
            .send({
                "roleid": 213,
                "permissionid": 2315
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not remove permission which does not exist on role', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/permission/remove`)
            .send({
                "roleid": 1,
                "permissionid": 4
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should remove permission', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/permission/remove`)
            .send({
                "roleid": 1,
                "permissionid": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should not assign role with invalid inputs', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                "roleid": 1,
                "userId": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign role with empty userId', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                "roleId": 1
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign role with empty roleId', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                "roleId": 1
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign role with empty roleId', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                roleId: 1
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign role with unknown user', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                roleId: 1,
                userId:123
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign unknown role ', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                roleId: 1,
                userId:123
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('should create a User', async () => {
		const user = {
			fullname: 'cyifuzo jean chrysostome',
			username: 'chance',
			password: 'test123',
		};
		const response = await chai.request(app).post(`/api/v1/users`).send(user);
		expect(response).to.have.status(201);
	});

 
})


describe("Testin access" , () => {
    before((done) => {
		done();
	});
    it('Should assign role ', (done) => {
        chai.request(app)
            .get(`/api/v1/users/`)            
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should assign role ', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                "userId": 2,
                "roleId": 1
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should not assign role, for unknow user ', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                roleId: 1,
                userId: 3
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not access this create route without authlization', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/createAccessTest`)
            .set({ userId : 2 , action : "createRoute"})
            .end((err, res) => {
                chai.expect(res).to.have.status(401);
				done()
            });            
    });

    it('Should  assign create permission', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/permission/assign`)
            .send({
                "roleid": 1,
                "permissionid": 6
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should access this create route ', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/createAccessTest`)
            .set({ userId : 2 , action : "createRoute"})
            .end((err, res) => {
                chai.expect(res).to.have.status(201);
				done()
            });            
    });

    it('should Retieve all roles', async () => {
		
        const permission = await getRolesPermission(1);
        console.log(permission);
	});
})