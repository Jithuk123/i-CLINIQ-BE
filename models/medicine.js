const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const medicine = sequelize.define(
    'medicine',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  medicine.associate = function (models) {
    // models.medicine.belongsToMany(models.observation, {
    //   through: models.observation_medicine,
    // });
  };
  return medicine;
};
