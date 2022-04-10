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

    it('should not create role which already exist', async () => {
		const response = await chai.request(app).post(`/api/v1/roles`).send({ rolename: "testAdmingfx" });
		expect(response).to.have.status(400);
	});

    it('Shoud prompt an error, if user id is not provided ', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/createAccessTest`)
            .set({ action : "createRoute"})
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Shoud prompt an error, if action is empty ', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/createAccessTest`)
            .set({ userId: 1, action : " "})
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
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

    it('Should not delete with empty param or not integer', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/asdfa`)
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
    it('Should not remove permission with valid inputs', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/permission/remove`)
            .send({})
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign permission whose role does not exist', (done) => {
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

    it('Should not remove permission which does not exist on role', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/permission/remove`)
            .send({
                "roleid": 1,
                "permissionid": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not remove permission  on role which does not exist', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/permission/remove`)
            .send({
                "roleid": 99,
                "permissionid": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign role with invalid inputs', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({})
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
    it('Should retrive role ', (done) => {
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
    
    it('Should not assign role again if it does exist ', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                "userId": 2,
                "roleId": 1
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not assign role  if role does not exist ', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/assign/users`)
            .send({
                "userId": 2,
                "roleId": 96
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
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

    it('Should not assign permission with invalid inputs', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/permission/assign`)
            .send({})
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should  assign  permission', (done) => {
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

    it('Should not assign permission again which exist', (done) => {
        chai.request(app)
            .post(`/api/v1/roles/permission/assign`)
            .send({
                "roleid": 1,
                "permissionid": 6
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
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
	});

    it('Should not update role with empty rolename ', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/1`)
            .send({ rolename: "" })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not update role with empty id param or not int', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/asdfsdf`)
            .send({ rolename: "newupdate" })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not update role with unknown roleid ', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/121`)
            .send({ rolename: "newrolename" })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should update role', (done) => {
        chai.request(app)
            .put(`/api/v1/roles/2`)
            .send({ rolename: "2" })
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });

    it('Should not remove role from unknown user  ', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/remove/users`)
            .send({
                "roleId": 1,
                "userId": 132
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });
    
    it('Should not remove role from unknown permission  ', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/remove/users`)
            .send({
                "roleId": 966,
                "userId": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should not remove role from user if it does there is no valid inputs', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/remove/users`)
            .send({})
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done();
            });            
    });
    it('Should not remove unkown role', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/remove/users`)
            .send({
                "roleId": 600,
                "userId": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done();
            });            
    });
    
    it('Should not remove role from user who does not have that role ', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/remove/users`)
            .send({
                "roleId": 4,
                "userId": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(400);
				done()
            });            
    });

    it('Should  remove role from  user  ', (done) => {
        chai.request(app)
            .delete(`/api/v1/roles/remove/users`)
            .send({
                "roleId": 1,
                "userId": 2
            })
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
				done()
            });            
    });
})