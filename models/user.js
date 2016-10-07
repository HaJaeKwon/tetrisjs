var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    score: Number,
    name: String,
    update_date: {type: Date, defalut: Date.now }
});

module.exports = mongoose.model('user', userSchema);