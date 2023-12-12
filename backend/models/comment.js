'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'});
      this.belongsTo(models.Post,{foreignKey:'post_id'});
    }
  }
  Comment.init({
    post_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Post id is required.'}, // required
        notEmpty:{msg:'Post id cannot be empty.'} // required
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
    content: {
      type:DataTypes.STRING,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Content is required.'}, // required
        notEmpty:{msg:'Content cannot be empty.'} // required
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};