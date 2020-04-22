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
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      labTestRequired: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      appointmentId: {
        type: DataTypes.UUID,
        references: {
          model: 'appointmens',
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
