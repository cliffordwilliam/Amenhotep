'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false, // required
        references:{model:"Users",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
      },
      age: {
        type: Sequelize.INTEGER
      },
      location: {
        type: Sequelize.STRING
      },
      attached_drink: {
        type: Sequelize.INTEGER,
        references:{model:"Drinks",key:"id"}, // fk
        onUpdate:"cascade", // fk
        onDelete:"cascade", // fk
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
    await queryInterface.dropTable('Profiles');
  }
};