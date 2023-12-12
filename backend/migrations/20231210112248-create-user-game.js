'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{model:"Users",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
        allowNull: false, // required
      },
      game_id: {
        type: Sequelize.INTEGER,
        references:{model:"Games",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
        allowNull: false, // required
      },
      high_score: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // default value
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
    await queryInterface.dropTable('User_Games');
  }
};