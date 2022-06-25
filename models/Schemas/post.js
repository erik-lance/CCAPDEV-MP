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

Post.create({
    post_id: 'Test Post 1',
    date_posted: '10-20-12',
    username: 'gian test',
    title: 'test Post',
    body: 'testing this'

}, (error,post) => {
    console.log(error,post)
})

module.exports = Post;