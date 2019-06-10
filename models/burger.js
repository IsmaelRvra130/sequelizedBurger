// var Sequelize = require("sequelize");
// var model = require("../config/config.js");



module.exports = function(sequelize, DataTypes) {
    var sequelizeburgers = sequelize.define("burgers", {
      burger_name: DataTypes.STRING,
      devoured: {
        type: DataTypes. BOOLEAN,
        defaultValue: false
      
    },});
    return sequelizeburgers;
  };

 
