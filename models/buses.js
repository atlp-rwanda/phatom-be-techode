'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class buses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  buses.init({
    bustype: DataTypes.STRING,
    routecode: DataTypes.INTEGER,
    platenumber: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'buses',
  });
  return buses;
};