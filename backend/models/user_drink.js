'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User_Drink extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'});
      this.belongsTo(models.Drink,{foreignKey:'drink_id'});
    }
  }
  User_Drink.init({
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'User id is required.'}, // required
        notEmpty:{msg:'User id cannot be empty.'} // required
      }
    },
    drink_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Drink id is required.'}, // required
        notEmpty:{msg:'Drink id cannot be empty.'} // required
      }
    }
  }, {
    sequelize,
    modelName: 'User_Drink',
  });
  return User_Drink;
};