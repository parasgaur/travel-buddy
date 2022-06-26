let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let callbackRequestsSchema = new Schema({
    id: String,
    phone: String,
    date: Date
});

let CallbackRequest = mongoose.model('CallbackRequest', callbackRequestsSchema, 'callback-requests');

//we can write like module.exports = { CallbackRequest }; or

module.exports = {
    CallbackRequest : CallbackRequest
};

