const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define(
    'role',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, paranoid: true }
  );

  role.associate = function (models) {
    role.hasMany(models.user, {
      foreignKey: 'roleId',
      as: 'role_userId',
    });
  };
  return role;
};
