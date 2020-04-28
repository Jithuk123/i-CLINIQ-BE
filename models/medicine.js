const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const medicine = sequelize.define(
    'medicine',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );
  medicine.associate = function (models) {};
  return medicine;
};
