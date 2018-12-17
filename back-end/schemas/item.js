var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    name: String,
    stock: Number,
    price: Number,
    timesOrdered: Number,
    rating: Number,
    url: String,
    flagged:Boolean
});

module.exports = Item = mongoose.model('item', itemSchema);