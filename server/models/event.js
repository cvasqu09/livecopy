var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categoryValidator = function (categoryArray) {
  console.log('Category is: ' + categoryArray);
  console.log(categoryArray.length);
  if (categoryArray == null || categoryArray.length == 0) {
    return false;
  }
  return true;
};

var eventSchema = new Schema({
  eventName: { type: String, required: true },
  categories: {
    type: Array,
    required: true,
    validate: {
      validator: categoryValidator,
      message: 'Categories cannot be empty.'
    }
  },
  numPeople: { type: Number, required: true }, // Do we want ranges? Querying may be better if we have just a number
  location: { type: [Number], index: '2dsphere' }, // Location be required?
  startTime: { type: Number }, // How are we going to store the time and what time zone will we use as reference?
  endTime: { type: Number },
  description: { type: String }, // Limit the length?
  eventOwner: { type: String, required: true },
  reports: { type: Number, default: 0 },
  _id: { type: Schema.Types.ObjectId }
},
{ versionKey: false });

module.exports = mongoose.model('Event', eventSchema);
