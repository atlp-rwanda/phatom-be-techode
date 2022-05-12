'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class buses extends Model {
		
		static associate(models) {
			buses.belongsTo(models.routes, {
<<<<<<< HEAD
				foreignKey: 'routeId',
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			});
			models.routes.hasMany(buses, {
				foreignKey: 'routeId'
			})
=======
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			});
>>>>>>> 81a6845 (ft(simulation) Bus simulation)
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
