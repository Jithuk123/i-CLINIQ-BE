const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define(
    'patient',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: DataTypes.STRING,

      age: DataTypes.INTEGER,
      sex: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      height: DataTypes.FLOAT,
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
    patient.hasMany(models.appointment, {
      foreignKey: 'patientId',
      as: 'appointment_patientId'
    });
    patient.hasMany(models.labTestcase, {
      foreignKey: 'patientId',
      as: 'labtestCase_patientId'
    });
  };
  return patient;
};
