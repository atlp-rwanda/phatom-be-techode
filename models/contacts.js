'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class contacts extends Model {
		
		static associate(models) {
			
		}
	}
	contacts.init(
		{
			fullname: DataTypes.STRING,
			phonenumber: DataTypes.INTEGER,
			email: DataTypes.STRING,
			message: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'contacts',
		}
	);
	return contacts;
};
