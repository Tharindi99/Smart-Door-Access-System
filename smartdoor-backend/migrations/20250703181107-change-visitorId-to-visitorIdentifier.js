'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove the old integer visitorId column
    await queryInterface.removeColumn('VisitorAccessCodes', 'visitorId');

    // Add new string visitorIdentifier column
    await queryInterface.addColumn('VisitorAccessCodes', 'visitorIdentifier', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert back if needed
    await queryInterface.addColumn('VisitorAccessCodes', 'visitorId', {
      type: Sequelize.INTEGER
    });

    await queryInterface.removeColumn('VisitorAccessCodes', 'visitorIdentifier');
  }
};
