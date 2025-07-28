'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert demo users
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        username: 'alicej',
        passwordHash: 'hashedpassword1',
        lastLogin: new Date(),
        isActive: true,
        role: 'employee',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob Smith',
        email: 'bob@example.com',
        username: 'bobsmith',
        passwordHash: 'hashedpassword2',
        lastLogin: new Date(),
        isActive: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Delete demo users if rollback
    await queryInterface.bulkDelete('Users', null, {});
  }
};
