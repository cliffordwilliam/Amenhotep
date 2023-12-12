'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User_Game extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'});
      this.belongsTo(models.Game,{foreignKey:'game_id'});
    }
  }
  User_Game.init({
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'User id is required.'}, // required
        notEmpty:{msg:'User id cannot be empty.'} // required
      }
    },
    game_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Game id is required.'}, // required
        notEmpty:{msg:'Game id cannot be empty.'} // required
      }
    },
    high_score: {
      type:DataTypes.INTEGER,
      defaultValue:0, // default value
      validate:{
      }
    }
  }, {
    sequelize,
    modelName: 'User_Game',
  });
  return User_Game;
};