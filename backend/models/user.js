'use strict';


const {Model} = require('sequelize');
const Helper = require('../helper');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.Profile,{foreignKey:'user_id'});
      this.hasMany(models.Comment,{foreignKey:'user_id'});
      this.hasMany(models.Chat,{foreignKey:'user_id'});
      this.hasMany(models.User_Drink,{foreignKey:'user_id'});
      this.hasMany(models.User_Game,{foreignKey:'user_id'});
      this.hasMany(models.Gift,{foreignKey:'sender_id'});
      this.hasMany(models.Gift,{foreignKey:'recipient_id'});
      this.hasMany(models.Post,{foreignKey:'user_id'});
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull:false, // required
      unique: {msg:'Username is already in use!'}, // unique
      validate:{
        notNull:{msg:'Username is required.'}, // required
        notEmpty:{msg:'Username cannot be empty.'}, // required
        len: {args:[3,255],msg:"Username must be between 3 and 255 characters."}
      },
    },
    password: {
      type:DataTypes.STRING,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Password is required.'}, // required
        notEmpty:{msg:'Password cannot be empty.'}, // required
        len: {args:[3,255],msg:"Password must be between 3 and 255 characters."}
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false, // required
      unique: {msg:'Email address is already in use!'},
      validate:{
        isEmail:{msg:'Please provide a valid email address.'}, //isEmail
        notNull:{msg:'Email is required.'}, // required
        notEmpty:{msg:'Email cannot be empty.'} // required
      },
    },
    profile_picture: {
      type:DataTypes.STRING,
      validate:{
        isUrl:{msg:'Please provide a valid url address.'}, // isUrl
      }
    },
    bio: {
      type:DataTypes.STRING,
      validate:{
        len: {args:[3,255],msg:"Bio must be between 3 and 255 characters."}
      }
    },
    credit: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      defaultValue:0, // default value
      validate:{
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async(user)=>{
    user.password = await Helper.hashPassword(user.password);
  })
  return User;
};