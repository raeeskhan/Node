//grab the things we need
var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);

var Schema = mongoose.Schema;

var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
  rating:{type:Number, min:1, max:5, required:true},
  comment:{type:String, required:true},
  author:{type:String, required:true}
}, {
  timestamps:true
});
//create a Schema
var dishSchema = new Schema({
    name:{
      type:String,
      required:true,
      unique:true
    },
    image:{
      data: Buffer,
      contentType: String
    },
    label:{
      type:String,
      default:'Hot'
    },
    price:{
      type:Currency,
      required:true
    },
    category:{
      type:String
    },
    description: {
      type:String,
      required:true
    },
    comments:[commentSchema]
  },{
    timestamps:true
  });

  //schema is useless until used and a model is created using it
  var Dishes = mongoose.model('Dish', dishSchema);
  module.exports = Dishes;
