'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visitor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // A Visitor can have many Access Codes
      Visitor.hasMany(models.VisitorAccessCode, {
        foreignKey: 'visitorId',
        as: 'accessCodes'
      });
    }

  }
  Visitor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING, // optional
    nationalId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
   sequelize,
   modelName: 'Visitor',
  });
  return Visitor;
};