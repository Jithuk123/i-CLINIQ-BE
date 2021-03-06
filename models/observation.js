const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const observation = sequelize.define(
    'observation',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
      },
      labTestRequired: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      appointmentId: {
        type: DataTypes.UUID,
        references: {
          model: 'appointment',
          key: 'id',
        },
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID,
      },
    },
    { timestamps: true, paranoid: true }
  );
  observation.beforeCreate((observation) => (observation.id = uuid()));
  observation.associate = function (models) {
    observation.belongsToMany(models.medicine, {
      foreignKey: 'observation_id',
      through: 'observation_medicine',
      as: 'observationMedicine',
    }),
      observation.belongsTo(
        models.appointment,
        {
          foreignKey: 'appointmentId',
          onDelete: 'CASCADE',
        },
        observation.hasMany(models.observation),
        {
          foreignKey: 'observationId',
          as: 'appointment_observationMedicineId',
        },

        observation.hasMany(models.observation),
        { foreignKey: 'observationId', as: 'labtestCase_observationId' }
      );
  };
  return observation;
};
