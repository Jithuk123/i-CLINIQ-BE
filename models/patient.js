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
        unique: true,
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    { timestamps: true, paranoid: true }
  );

  patient.associate = function (models) {
    patient.hasMany(models.appointment, {
      foreignKey: 'patientId',
      as: 'appointment_patientId',
    });
    patient.hasMany(models.labTestcase, {
      foreignKey: 'patientId',
      as: 'labtestCase_patientId',
    });

    models.patient.belongsTo(models.user, {
      foreignKey: 'createdBy',
      onDelete: 'CASCADE',
    });
  };
  return patient;
};
