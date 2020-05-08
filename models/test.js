const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define(
    'test',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  test.associate = function (models) {
    test.hasMany(models.labTestcase, {
      foreignKey: 'createdBy',
      as: 'labTestcase_test',
    });
  };
  return test;
};
