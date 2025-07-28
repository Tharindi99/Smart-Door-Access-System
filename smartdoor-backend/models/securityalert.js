'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SecurityAlert extends Model {
    static associate(models) {
      // ↘ Door
      SecurityAlert.belongsTo(models.Door, {
        foreignKey: 'doorId',
        as: 'door'
      });

      // ↘ AccessRequest
      SecurityAlert.belongsTo(models.AccessRequest, {
        foreignKey: 'accessRequestId',
        as: 'accessRequest'
      });

      /* Optional many-to-many if you add SecurityOfficer later
      SecurityAlert.belongsToMany(models.SecurityOfficer, {
        through: 'SecurityAlertOfficer',
        foreignKey: 'alertId',
        otherKey: 'officerId',
        as: 'notifiedOfficers'
      });
      */
    }
  }

  SecurityAlert.init(
    {
      reason: DataTypes.STRING,
      attempts: DataTypes.INTEGER,
      timestamp: DataTypes.DATE,
      doorId: DataTypes.INTEGER,
      accessRequestId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'SecurityAlert'
    }
  );

  return SecurityAlert;
};
