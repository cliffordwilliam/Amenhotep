'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER,
        references:{model:"Posts",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
        allowNull: false, // required
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{model:"Users",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
        allowNull: false, // required
      },
      content: {
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
    await queryInterface.dropTable('Comments');
  }
};