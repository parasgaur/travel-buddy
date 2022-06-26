let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let emailSchema = new Schema({
    id: String,
    email: String,
    name: String,
    text: String,
    date: Date
});

//3rd argument is the name of the collection in DB for adding documents
let Email = mongoose.model('Email', emailSchema, 'emails');

//we can write like module.exports = { CallbackRequest }; or

module.exports = { Email };

