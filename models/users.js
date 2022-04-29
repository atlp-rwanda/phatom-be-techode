'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      users.belongsTo(models.roles);
      models.roles.hasMany(users,{
        onDelete: 'SET NULL',
				onUpdate: 'SET NULL',
      });
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
    profileImage: DataTypes.STRING,
    userType: DataTypes.STRING,
    telephone: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};