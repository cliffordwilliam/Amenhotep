'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chat_room_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // required
        references:{model:"Chat_Rooms",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // required
        references:{model:"Users",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
      },
      message: {
        type: Sequelize.STRING,
        allowNull: false, // required
        defaultValue: "Sent", // default value
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false, // required
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chats');
  }
};