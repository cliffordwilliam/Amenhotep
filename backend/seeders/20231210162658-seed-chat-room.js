'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Chat_Rooms', [
      {
        name:"Velvet Room",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:"Tartarus Lounge",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name:"Duodecim Pub",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Chat_Rooms', null, {});
  }
};
