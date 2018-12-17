var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    user: String,
    item: String,
    name: String,
    title: String,
    text: String,
    rating: Number,
    time: Date,
    hidden: Boolean
});

module.exports = UserComment = mongoose.model('comment', commentSchema);