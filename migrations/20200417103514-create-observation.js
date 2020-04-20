'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('observations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      labTestRequired: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      appointmentId: {
        type: Sequelize.UUID,
        references: {
          model: 'appointments',
          key: 'id',
        },
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.UUID,
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
    return queryInterface.dropTable('observations');
  },
};
