const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    post_id:{
        type: String,
        required: true,
        unique: true
    },
    date_posted: {
        type: Date,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    upvotes: Number,
    downvotes: Number,
    puzzle_id: String
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;