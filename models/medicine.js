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
    { timestamps: true, paranoid: true }
  );
  medicine.associate = function (models) {};
  return medicine;
};
