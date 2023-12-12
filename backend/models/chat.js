'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      this.belongsTo(models.Chat_Room,{foreignKey:'chat_room_id'});
      this.belongsTo(models.User,{foreignKey:'user_id'});
    }
  }
  Chat.init({
    chat_room_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Chat room id is required.'}, // required
        notEmpty:{msg:'Chat room id cannot be empty.'} // required
      }
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'User id is required.'}, // required
        notEmpty:{msg:'User id cannot be empty.'} // required
      }
    },
    message: {
      type:DataTypes.STRING,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Message is required.'}, // required
        notEmpty:{msg:'Message cannot be empty.'} // required
      }
    },
    status: {
      type:DataTypes.STRING,
      allowNull:false, // required
      defaultValue:"Sent", // default value
      validate:{
        notNull:{msg:'Status is required.'}, // required
        notEmpty:{msg:'Status cannot be empty.'} // required
      }
    }
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};