'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class route extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			route.hasMany(models.buses, {
				foreignKey: 'routeId',
				onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
			});
			models.buses.belongsTo(route, {
				foreignKey: 'routeId',
			})
			// define association here
		}
	}
	route.init(
		{
			name: DataTypes.STRING,
			code: DataTypes.STRING,
			city: DataTypes.STRING,
			startLocation: DataTypes.STRING,
			endLocation: DataTypes.STRING,
			duration: DataTypes.STRING,
			distance: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'routes',
		}
	);
	return route;
};
