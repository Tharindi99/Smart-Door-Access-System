'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A User can make many AccessRequests
      User.hasMany(models.AccessRequest, {
        foreignKey: 'userId',
        as: 'accessRequests'
      });

      // A User (Employee) can generate many VisitorAccessCodes
      User.hasMany(models.VisitorAccessCode, {
        foreignKey: 'employeeId',  // You will create this FK later in VisitorAccessCode
        as: 'generatedAccessCodes'
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    passwordHash: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    isActive: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};