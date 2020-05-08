const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    'user',
    {
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

  user.associate = function (models) {
    models.user.belongsTo(models.role, {
      foreignKey: 'roleId',
      onDelete: 'CASCADE',
    });

    user.hasMany(models.appointment, {
      foreignKey: 'createdBy',
      as: 'user_test',
    });
    user.hasMany(models.labTestcase, {
      foreignKey: 'createdBy',
      as: 'user_labTestcase',
    });
    user.hasMany(models.patient, {
      foreignKey: 'createdBy',
      as: 'user_patient',
    });
    user.hasMany(models.observation, {
      foreignKey: 'createdBy',
      as: 'user_observation',
    });
  };
  return user;
};
