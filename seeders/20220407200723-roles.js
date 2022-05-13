'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
    */
      await queryInterface.bulkInsert('roles', [
        {
          rolename: 'Admin',
          permissions:"editProfile,viewBusMovement,createRoute,deleteRoute,updateRoute,assignBus,removeBus,createBus,deleteBus,updateBus,registerDriver,registerOperator"
        },
        {
          rolename: 'Operator',
          permissions:"editProfile,viewBusMovement,createRoute,deleteRoute,updateRoute,assignBus,removeBus,createBus,deleteBus,updateBus"
        },
        {
          rolename: 'Driver',
          permissions:"editProfile,viewBusMovement,startBus,stopBus,changeSpeed"
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
