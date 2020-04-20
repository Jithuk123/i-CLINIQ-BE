'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('observation_medicines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      observationId: {
        type: Sequelize.UUID,
        references: {
          model: 'observations',
          key: 'id',
        },
      },
      medicineId: {
        type: Sequelize.UUID,
        references: {
          model: 'medicines',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('observation_medicines');
  },
};
