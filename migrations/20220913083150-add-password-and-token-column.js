'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Writers', 'password', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Writers', 'access_token', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Writers', 'refresh_token', {
        type: Sequelize.STRING,
      }),
    ];
  },

  async down (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn(
        'Writers', 
        'password'
      ),
      queryInterface.removeColumn(
        'Writers', 
        'access_token'
      ),
      queryInterface.removeColumn(
        'Writers', 
        'refresh_token'
      ),

    ]      
  }
};
