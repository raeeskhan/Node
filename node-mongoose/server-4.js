var mongoose = require('mongoose'),
    assert = require('assert'),
    fs = require('fs');

var Dishes = require('./models/dishes-4');

var imagePath = './images/';
//Connection url
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  //wee are connected
  console.log('Connected correctly to server');
//create a new dish
  Dishes.create({name:'Uthapizza', image:{data:new Buffer(imagePath+'1.png', 'base64'), contentType:'image/png'}, category:'mains', price:'$105.45',description:'Test', comments:[{rating:3,comment:'This is insane',author:'Mat Daemin'}]}, function(err, dish) {
    if(err) throw err;
    //created a dish
    console.log('Created the dish: '+dish);
    var id = dish._id;

    setTimeout(function() {
      Dishes.findByIdAndUpdate(id, {$set: {description:"Test updated"}}, {new: true})
                              .exec(function(err, dish) {
                                if(err) throw err;
                                //the updated dish
                                console.log('Updated Dish: ');
                                console.log(dish);

                                dish.comments.push({
                                  rating:5,
                                  comment:'I am geting a sinking feeling',
                                  author:'Leonardo di Cap'
                                });

                                dish.save(function(err, dish){
                                  console.log('Updated comments !');
                                  console.log(dish);

                                db.collection('dishes').drop(function() {
                                  db.close();
                                });
                                });
                              });

    }, 3000);



  });

      //update the dish
    //  Dishes.update({name:'Uthapizza', {$set: {description: 'Test updated'}}}, function(err, ) {
      //  if(err) throw err;
        //updated successfully
      //  console.log();
    //  });
});
