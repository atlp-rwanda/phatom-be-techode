'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class resetTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }	
    checkValid = function () {
      const time = new Date(this.expiration).getTime();
      return time > new Date().getTime();
    };
  }
  resetTokens.init({
    token: DataTypes.STRING,
    expiration: DataTypes.DATE,
    user: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: (resetTokens) => {
        const time = new Date();
        resetTokens.expiration = time.setSeconds(time.getSeconds() + 7200);
      }
    },
    sequelize,
    modelName: 'resetTokens',
  });

  return resetTokens;
};