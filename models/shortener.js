const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const options = {
  minimize: false
}

const UrlSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true
  },
  original: {
    type: String,
    required: true,
    trim: true
  },
  shorten: {
    type: String,
    required: true,
    trim: true
  },
}, options);

UrlSchema.plugin(timestamps);

const Url = mongoose.model('Url', UrlSchema);
module.exports = Url;
