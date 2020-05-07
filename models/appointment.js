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
      assignedTo: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      status: {
        allowNull: false,
        type: DataTypes.STRING,
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
    // appointment.belongsTo(models.observation, {
    //   foreignKey: 'appointmentId',
    // });

    appointment.hasMany(models.observation, {
      foreignKey: 'appointmentId',
      as: 'obsevation_appointmentId',
    });

    appointment.belongsTo(models.patient, {
      foreignKey: 'patientId',
      onDelete: 'CASCADE',
    });
    appointment.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return appointment;
};
