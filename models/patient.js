const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define(
    'patient',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: DataTypes.STRING,

      age: DataTypes.INTEGER,
      sex: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      phoneNumber: {
        type: DataTypes.STRING,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, paranoid: true }
  );
  patient.beforeCreate((patient) => (patient.id = uuid()));
  patient.associate = function (models) {
    patient.hasMany(models.patient),
      { foreignKey: 'patientId', as: 'appointment_patientId' };
    patient.hasMany(models.patient),
      { foreignKey: 'patientId', as: 'labtestCase_patientId' };
  };
  return patient;
};
