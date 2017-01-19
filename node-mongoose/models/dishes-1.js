//grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Schema
var dishSchema = new Schema({
    name:{
      type:String,
      required:true,
      unique:true
    },
    description: {
      type:String,
      required:true
    }
  },{
    timestamps:true
  });

  //schema is useless until used and a model is created using it
  var Dishes = mongoose.model('Dish', dishSchema);
  module.exports = Dishes;
