var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullName: { type: String, required: true },
  categories: {
    type: Array,
    required: true
  },
  eventIds: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  strikes: { type: Number },
  ICENumbers: [{ phoneNumber: String, provider: String, confirmed: Boolean }],
  _id: { type: Schema.Types.ObjectId }
},
{ versionKey: false });

module.exports = mongoose.model('User', userSchema);
