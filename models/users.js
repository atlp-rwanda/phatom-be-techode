'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.belongsTo(models.roles);
      models.roles.hasMany(users);
    }
  }
  users.init({
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    roleId: DataTypes.INTEGER,
    email: DataTypes.STRING,
    roles: DataTypes.STRING,
    password: DataTypes.STRING,
    userType: DataTypes.STRING,
    telephone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};