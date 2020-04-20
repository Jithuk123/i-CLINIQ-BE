const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const appointment = sequelize.define(
    'appointment',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      patientId: {
        type: DataTypes.UUID,
        references: {
          model: 'patient',
          key: 'id',
        },
      },
      createdBy: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    { timestamps: true, paranoid: true }
  );
  appointment.beforeCreate((appointment) => (appointment.id = uuid()));
  appointment.associate = function (models) {
    appointment.hasMany(models.appointment),
      { foreignKey: 'appointmentId', as: 'observations_appointmentId' };

    appointment.belongsTo(models.patient, {
      foreignKey: 'patinetId',
      onDelete: 'CASCADE',
    });
  };
  return appointment;
};
