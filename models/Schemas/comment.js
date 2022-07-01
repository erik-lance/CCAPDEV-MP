const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment_id: {
        type:   String,
        required: true,
        unique: true
    },
    post_id:{
        type: String,
        required: true
    },
    username:{
        type:   String,
        required:  true
    },
    date_posted:{
        type: Date,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    reply_id:{
        type: String
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;