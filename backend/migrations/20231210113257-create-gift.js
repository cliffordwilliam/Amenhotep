'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gifts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sender_id: {
        type: Sequelize.INTEGER,
        references:{model:"Users",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
        allowNull: false, // required
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references:{model:"Users",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
        allowNull: false, // required
      },
      drink_id: {
        type: Sequelize.INTEGER,
        references:{model:"Drinks",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
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
    await queryInterface.dropTable('Gifts');
  }
};