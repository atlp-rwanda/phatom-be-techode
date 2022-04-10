const Sequelize = require('sequelize') 
const sequelize = require('./index.js')


const resetToken = sequelize.define('reset-token', {
	token: Sequelize.STRING,
	expiration: Sequelize.DATE,
	user: Sequelize.STRING,
});

resetToken.beforeCreate(function () {
	const time = new Date();
	this.expiration = time.setSeconds(time.getSeconds() + 300).toString();
});

resetToken.prototype.checkValid = function () {
	const time = new Date(this.expiration).getTime();
	return time > new Date().getTime();
};

module.exports = resetToken
