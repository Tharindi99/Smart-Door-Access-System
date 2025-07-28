'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('VisitorAccessCodes', 'employeeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',   // table name
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down (queryInterface) {
    await queryInterface.removeColumn('VisitorAccessCodes', 'employeeId');
  }
};
