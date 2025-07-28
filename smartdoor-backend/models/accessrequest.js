'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AccessRequest extends Model {
    static associate(models) {
      // Door
      AccessRequest.belongsTo(models.Door, {
        foreignKey: 'doorId',
        as: 'door'
      });

      // User / Employee
      AccessRequest.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'employee'
      });

      // VisitorAccessCode
      AccessRequest.belongsTo(models.VisitorAccessCode, {
        foreignKey: 'visitorAccessCodeId',
        as: 'visitorCode'
      });

      // SecurityAlert
      AccessRequest.hasOne(models.SecurityAlert, {
        foreignKey: 'accessRequestId',
        as: 'securityAlert'
      });
    }
  }

  AccessRequest.init(
    {
      timestamp: DataTypes.DATE,
      method: DataTypes.STRING,
      status: DataTypes.STRING,
      attempts: DataTypes.INTEGER,
      failedCount: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      visitorAccessCodeId: DataTypes.INTEGER,
      doorId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'AccessRequest'
    }
  );
  return AccessRequest;
};
