'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('VisitorAccessCodes', 'visitorId', {
      type: Sequelize.INTEGER,
      allowNull: true,  // or false if you want it required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('VisitorAccessCodes', 'visitorId');
  }
};
