'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class buses extends Model {
		
		static associate(models) {
			buses.belongsTo(models.routes, {
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			});
		}
	}
	buses.init(
		{
			bustype: DataTypes.STRING,
			routecode: DataTypes.INTEGER,
			routeId: DataTypes.INTEGER,
			platenumber: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'buses',
		}
	);
	return buses;
};
