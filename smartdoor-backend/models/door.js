'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Door extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     // 1  One door can have many visitor access codes
     Door.hasMany(models.VisitorAccessCode, {
       foreignKey: 'doorId',
      as: 'visitorCodes'
     });

     // 2 One door can have many access requests (log of unlock attempts)
     Door.hasMany(models.AccessRequest, {
       foreignKey: 'doorId',
       as: 'accessRequests'
     });

      // 3  One door can have many security alerts
      Door.hasMany(models.SecurityAlert, {
        foreignKey: 'doorId',
        as: 'securityAlerts'
      });
    }
  }
  Door.init({
    location: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Door',
  });
  return Door;
};