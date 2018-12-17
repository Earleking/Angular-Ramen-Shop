var mongoose = require('mongoose');

var policySchema = mongoose.Schema({
    type: String,
    body: String
});

module.exports = Policy = mongoose.model('policy', policySchema);