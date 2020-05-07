const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const observation = sequelize.define(
    'observation',
    {
      labTestRequired: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      appointmentId: {
        type: DataTypes.UUID,
        references: {
          model: 'appointments',
          key: 'id',
        },
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    { timestamps: true, paranoid: true }
  );

  observation.associate = function (models) {
    observation.belongsTo(models.appointment, {
      foreignKey: 'appointmentId',
      onDelete: 'CASCADE',
    });
    observation.belongsTo(models.user, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
    });

    observation.hasMany(models.labTestcase, {
      foreignKey: 'observationId',
      as: 'labtestCase_observationId',
    });

    // observation.belongsTo(models.medicine, {
    //   foreignKey: 'observationId',
    //   through: 'observation_medicines',
    //   as: 'observationMedicine',
    // });
  };
  return observation;
};
