'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('patients', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: Sequelize.STRING,
      age: Sequelize.INTEGER,
      sex: Sequelize.STRING,
      weight: Sequelize.FLOAT,
      height: Sequelize.FLOAT,
      phoneNumber: {
        type: Sequelize.STRING,
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('patients');
  },
};
