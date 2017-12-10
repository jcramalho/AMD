var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = new Schema(
  {
    data: {type: String,required:true},
    desc: {type: String}
  }
);

//Export model
module.exports = mongoose.model('Log', LogSchema, 'logs');