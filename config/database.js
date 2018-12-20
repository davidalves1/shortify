const config = require('./index');
const mongoose = require('mongoose');

module.exports = mongoose.connect(config.db.uri, { useNewUrlParser: true });
