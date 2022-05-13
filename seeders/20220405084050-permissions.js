'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
    */
    await queryInterface.bulkInsert('permissions', 
      [
        {
          permission: 'startBus',
          permission_name: 'Start bus'
        },
        {
          permission: 'stopBus',
          permission_name: 'Stop bus'
        },
        {
          permission: 'viewBusMovement',
          permission_name: 'View bus movement'
        },
        {
          permission: 'changeSpeed',
          permission_name: 'Change speed'
        },        
        {
          permission: 'editProfile',
          permission_name: 'Edit profile'
        },        
        {
          permission: 'createRoute',
          permission_name: 'Create route'
        },        
        {
          permission: 'deleteRoute',
          permission_name: 'Delete route'
        },
        {
          permission: 'updateRoute',
          permission_name: 'Update route'
        },       
        {
          permission: 'assignBus',
          permission_name: 'Assign bus'
        },
        {
          permission: 'removeBus',
          permission_name: 'Remove bus'
        },        
        {
          permission: 'createBus',
          permission_name: 'Create bus'
        },        
        {
          permission: 'deleteBus',
          permission_name: 'Delete bus'
        },
        {
          permission: 'updateBus',
          permission_name: 'Update bus'
        },        
        {
          permission: 'registerDriver',
          permission_name: 'Register driver'
        },
        {
          permission: 'registerOperator',
          permission_name: 'Register operator'
        },
      ] 
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
    */
    await queryInterface.bulkDelete('permissions', null, {});
  }
};
