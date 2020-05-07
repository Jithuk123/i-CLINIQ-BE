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
        allowNull: false,
        type: DataTypes.UUID,
      },
    },
    { timestamps: true, paranoid: true }
  );

  observation.associate = function (models) {
    observation.belongsTo(models.appointment);
    observation.hasMany(models.labTestcase);
    observation.belongsToMany(models.medicine, {
      foreignKey: 'observation_id',
      through: 'observation_medicines',
      as: 'observationMedicine',
    });
  };
  return observation;
};
