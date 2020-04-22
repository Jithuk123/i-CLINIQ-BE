'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('labTestcases', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
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
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
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
