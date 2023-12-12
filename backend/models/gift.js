'use strict';


const {Model} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Gift extends Model {
    static associate(models) {
      this.belongsTo(models.User,{foreignKey:'sender_id'});
      this.belongsTo(models.User,{foreignKey:'recipient_id'});
      this.belongsTo(models.Drink,{foreignKey:'drink_id'});
    }
  }
  Gift.init({
    sender_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Sender id is required.'}, // required
        notEmpty:{msg:'Sender id cannot be empty.'} // required
      }
    },
    recipient_id: {
      type:DataTypes.INTEGER,
      allowNull:false, // required
      validate:{
        notNull:{msg:'Recipient id is required.'}, // required
        notEmpty:{msg:'Recipient id cannot be empty.'} // required
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
    modelName: 'Gift',
  });
  return Gift;
};