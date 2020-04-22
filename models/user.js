const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },

      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phoneNumber: {
        type: DataTypes.STRING,
      },
      roleId: {
        type: DataTypes.UUID,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
    }
  );
  user.beforeCreate((user) => (user.id = uuid()));
  user.associate = function (models) {
    models.user.belongsTo(models.role, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
    });
  };
  return user;
};
