'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Chat_Room extends Model {
    static associate(models) {
      this.hasMany(models.Chat,{foreignKey:'chat_room_id'});
    }
  }
  Chat_Room.init({
    name: {
      type:DataTypes.STRING,
      validate:{
      }
    }
  }, {
    sequelize,
    modelName: 'Chat_Room',
  });
  return Chat_Room;
};