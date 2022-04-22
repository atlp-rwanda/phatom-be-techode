'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class operators extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      operators.belongsTo(models.users, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      models.users.hasOne(operators, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  operators.init({
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'operators',
    freezeTableName: true,
  });
  return operators;
};