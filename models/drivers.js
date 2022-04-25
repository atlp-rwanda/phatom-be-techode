'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drivers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      drivers.belongsTo(models.users, {
        onDelete: 'CASCADE',
        onupdate: 'CASCADE'
      })
      models.users.hasOne(drivers, {
        onDelete: 'CASCADE',
        onupdate: 'CASCADE'
      })
      drivers.belongsTo(models.buses, {
        onDelete: 'CASCADE',
        onupdate: 'CASCADE'
      })
      models.buses.hasOne(drivers, {
        onDelete: 'CASCADE',
        onupdate: 'CASCADE'
      })
    }
  }
  drivers.init({
    userId: DataTypes.INTEGER,
    driversLicense: DataTypes.STRING,
    busId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'drivers',
  });
  return drivers;
};