'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('VisitorAccessCodes', 'startTime', {
      type: Sequelize.DATE
    });
    await queryInterface.addColumn('VisitorAccessCodes', 'endTime', {
      type: Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('VisitorAccessCodes', 'startTime');
    await queryInterface.removeColumn('VisitorAccessCodes', 'endTime');
  }
};
