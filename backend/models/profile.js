'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'});
      this.belongsTo(models.Drink,{foreignKey:'attached_drink'});
    }
  }
  Profile.init({
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'User id is required.'}, // required
        notEmpty:{msg:'User id cannot be empty.'} // required
      }
    },
    age: {
      type:DataTypes.INTEGER,
      validate:{
        min:{args:[1],msg:"Age must be a minimum of 1."}
      }
    },
    location: {
      type:DataTypes.STRING,
      validate:{
      }
    },
    attached_drink: {
      type:DataTypes.INTEGER,
      validate:{
      }
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};