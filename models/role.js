const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
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
  role.beforeCreate((role) => (role.id = uuid()));
  role.associate = function (models) {};
  return role;
};
