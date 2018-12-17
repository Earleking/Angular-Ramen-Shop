var mongoose = require('mongoose');

var noticeSchema = mongoose.Schema({
    type: String,
    body: String,
    item: String,
    itemType: String,
    resolved: false,
    filee: String
});

module.exports = Notice = mongoose.model('notice', noticeSchema);