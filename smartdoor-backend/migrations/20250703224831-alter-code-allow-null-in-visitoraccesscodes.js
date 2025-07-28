'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('VisitorAccessCodes', 'code', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('VisitorAccessCodes', 'code', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
