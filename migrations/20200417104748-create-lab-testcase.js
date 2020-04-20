'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('labTestcases', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      resultUrl: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isResultGenarated: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      observationId: {
        type: Sequelize.UUID,
        references: {
          model: 'observations',
          key: 'id',
        },
      },
      patientId: {
        type: Sequelize.UUID,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      testId: {
        type: Sequelize.UUID,
        references: {
          model: 'tests',
          key: 'id',
        },
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('labTestcases');
  },
};
