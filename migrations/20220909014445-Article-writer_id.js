'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.addColumn(
      'Articles',
      'writerId',
      {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: {
          model:"Writers",
          key:"id"
        },
      }
    );
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.removeColumn(
      'Articles', 
      'writerId' 
    );
  }
};
