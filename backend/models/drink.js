'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Drink extends Model {
    static associate(models) {
      this.hasMany(models.User_Drink,{foreignKey:'drink_id'});
      this.hasMany(models.Profile,{foreignKey:'attached_drink'});
      this.hasMany(models.Gift,{foreignKey:'drink_id'});
    }
  }
  Drink.init({
    name: {
      type:DataTypes.STRING,
      validate:{
      }
    },
    description: {
      type:DataTypes.STRING,
      validate:{
      }
    },
    price: {
      type:DataTypes.INTEGER,
      validate:{
      }
    }
  }, {
    sequelize,
    modelName: 'Drink',
  });
  return Drink;
};