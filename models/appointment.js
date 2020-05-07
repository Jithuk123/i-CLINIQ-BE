const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const appointment = sequelize.define(
    'appointment',
    {
      patientId: {
        type: DataTypes.UUID,
        references: {
          model: 'patients',
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

  appointment.associate = function (models) {
    appointment.hasMany(models.observation, {
      foreignKey: 'appointmentId',
      as: 'obsevation_appointmentId',
    });

    appointment.belongsTo(models.patient, {
      foreignKey: 'patientId',
      onDelete: 'CASCADE',
    });
  };
  return appointment;
};
