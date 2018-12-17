var mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
    user: String,
    items: Object,
    active: Boolean,
    name: String,
    public: Boolean
});

module.exports =  Cart = mongoose.model('cart', cartSchema);