'use strict'
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/config.js');
const dotEnv = require('dotenv');
dotEnv.config();
const basename = path.basename(__filename);
const env = process.env.ENVIRONMENT || 'development';
const config = envConfigs[env];
const db = {};

let sequelize;

if (config.url) {
	sequelize = new Sequelize(config.url, config);
} 
/* c8 ignore next 3 */
else {
	sequelize = new Sequelize(config.database, config.username, config.password, config);
  }

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		/* c8 ignore next 2 */
		console.error('Unable to connect to the database:', err.message);
	});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;