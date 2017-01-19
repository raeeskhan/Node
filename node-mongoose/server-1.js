var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes-1');

//Connection url
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  //wee are connected
  console.log('Connected correctly to server');

  //create a new users
  var newDish = Dishes({name:'Uthapizza', description:'Test'});
  //save the users
  newDish.save(function(err) {
    if(err) throw err;
    console.log('Dish created');

    //get all the dishes
    Dishes.find({}, function(err, dishes) {
      if(err) throw err;
      //all dishes
      console.log(dishes);

      //close the connection
      db.collection('dishes').drop(function() {
        db.close();
      });

      //update the dish
    //  Dishes.update({name:'Uthapizza', {$set: {description: 'Test updated'}}}, function(err, ) {
      //  if(err) throw err;
        //updated successfully
      //  console.log();
    //  });
    });
  });

});
