'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   const a= await queryInterface.addConstraint("buses",{
      fields: ["routeId"],
      type: "foreign key",
      name:"route_inherit_buses",
      references:{
        table: "routes",
        field: "id"
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint("buses","route_inherit_buses")
  }
};
