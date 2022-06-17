const mongoose = require('mongoose');

const Post = require('./Schemas/post');

mongoose.connect('mongodb://localhost/post-db');

Post.create({
    post_id: 'Test Post 1',
    date_posted: '10-20-12',
    username: 'gian test',
    title: 'test Post',
    body: 'testing this'

}, (error,post) => {
    console.log(error,post)
})