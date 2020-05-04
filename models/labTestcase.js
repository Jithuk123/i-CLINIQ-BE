const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const labTestcase = sequelize.define(
    'labTestcase',
    {
      resultUrl: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isResultGenarated: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      observationId: {
        type: DataTypes.UUID,
        references: {
          model: 'observations',
          key: 'id',
        },
      },
      patientId: {
        type: DataTypes.UUID,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      testId: {
        type: DataTypes.UUID,
        references: {
          model: 'tests',
          key: 'id',
        },
      },
      createdBy: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    { timestamps: true, paranoid: true }
  );
  labTestcase.beforeCreate((labTestcase) => (labTestcase.id = uuid()));
  labTestcase.associate = function (models) {
    labTestcase.belongsTo(models.observation, {
      foreignKey: 'observationId',
      onDelete: 'CASCADE',
    });
    labTestcase.belongsTo(models.patient, {
      foreignKey: 'patientId',
      onDelete: 'CASCADE',
    });
    labTestcase.belongsTo(models.test, {
      foreignKey: 'testId',
      onDelete: 'CASCADE',
    });
    labTestcase.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return labTestcase;
};
