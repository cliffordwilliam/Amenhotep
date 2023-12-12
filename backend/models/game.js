'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      this.hasMany(models.User_Game,{foreignKey:'game_id'});
    }
  }
  Game.init({
    name: {
      type:DataTypes.STRING,
      validate:{
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
      }
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};