'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Articles', 
      'category', 
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'Articles', 
      'category' 
    );
  }
};
