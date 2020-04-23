'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [
      {
        id: 'd9aa3fb5-015e-4891-8eb8-c8e78eb7d054',
        name: 'Admin',
      },
      {
        id: '4f97ba32-3027-4c5b-9dfe-d9ed87a41856',
        name: 'Doctor',
      },
      {
        id: '286daee7-4514-41b5-a8f8-f833bd243079',
        name: 'Lab Technician',
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  },
};
