'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'user_id'});
      this.hasMany(models.Comment,{foreignKey:'post_id'});
    }
  }
  Post.init({
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'User id is required.'}, // required
        notEmpty:{msg:'User cannot be empty.'} // required
      }
    },
    content: {
      type:DataTypes.TEXT,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Content is required.'}, // required
        notEmpty:{msg:'Content cannot be empty.'} // required
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};