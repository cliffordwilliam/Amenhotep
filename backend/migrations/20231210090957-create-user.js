'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, // required
        unique: true, // unique
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // required
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // required
        unique: true, // unique
        isEmail:true, // isEmail
      },
      profile_picture: {
        type: Sequelize.STRING,
        isUrl:true, // isUrl
      },
      bio: {
        type: Sequelize.STRING
      },
      credit: {
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
    await queryInterface.dropTable('Users');
  }
};