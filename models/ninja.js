const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

  // create geolocation schema
  const geoSchema = new Schema({
    type:{
      type:String,
      default:'Point'
    },
    coordinates: {
      type:[Number],
      index:"2dsphere"
    }
  });


// create  ninja schema & model
const ninjaSchema = new Schema({
name :{
  type:String,
  required: [true, 'Name field is required']
},
rank:{
  type:String
},
available:{
  type: Boolean,
  default: true
},
// add in geo location
geometry: geoSchema

});
const Ninja = mongoose.model('ninjas', ninjaSchema);

module.exports = Ninja;
