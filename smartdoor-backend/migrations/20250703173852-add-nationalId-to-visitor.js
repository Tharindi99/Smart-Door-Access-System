'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Visitors', 'nationalId', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('Visitors', 'nationalId');
  }
};
