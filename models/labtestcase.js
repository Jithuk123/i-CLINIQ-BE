const uuid = require('uuid/v4');
('use strict');
module.exports = (sequelize, DataTypes) => {
  const labTestcase = sequelize.define(
    'labTestcase',
    {
      // id: {
      //   allowNull: false,
      //   primaryKey: true,
      //   type: DataTypes.UUID,
      // },
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
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: true, paranoid: true }
  );
  labTestcase.beforeCreate((labTestcase) => (labTestcase.id = uuid()));
  labTestcase.associate = function (models) {
    labTestcase.belongsTo(models.observation, {
      foreignKey: 'observationId',
      onDelete: 'CASCADE',
    }),
      labTestcase.belongsTo(models.patient, {
        foreignKey: 'patientId',
        onDelete: 'CASCADE',
      }),
      labTestcase.belongsTo(models.test, {
        foreignKey: 'testId',
        onDelete: 'CASCADE',
      });
  };
  return labTestcase;
};
