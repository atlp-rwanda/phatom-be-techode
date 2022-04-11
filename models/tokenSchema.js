'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class resetToken extends Model {
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
  resetToken.init({
    token: DataTypes.STRING,
	expiration: DataTypes.DATE,
	user: DataTypes.STRING,
  }, {
	hooks: {
		beforeCreate: (User) => {
			const time = new Date();
			this.expiration = time.setSeconds(time.getSeconds() + 300).toString();
		}
	},
    sequelize,
    modelName: 'reset-token',
  });

  return resetToken;
};
