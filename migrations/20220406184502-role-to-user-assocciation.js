'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("users",{
      fields: ["roleId"],
      type: "foreign key",
      name:"users_inhert_roles",
      references:{
        table: "roles",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users","users_inhert_roles")
  }
};
