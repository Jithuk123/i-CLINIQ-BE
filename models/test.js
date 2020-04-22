const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const test = sequelize.define(
    'test',
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
  test.beforeCreate((test) => (test.id = uuid()));
  test.associate = function (models) {};
  return test;
};
