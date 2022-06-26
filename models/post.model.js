let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let postSchema = new Schema({
    //so that by using this id we can delete/update the post.
    id: String,
    title: String,
    date: Date,
    description: String,
    text: String, 
    country: String,
    imageURL: String
});

let Post = mongoose.model('Post', postSchema);

module.exports = {
    Post: Post
};
