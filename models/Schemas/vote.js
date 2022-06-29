const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    vote_id: {
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
    upvote:{
        type: Boolean
    },
    downvote:{
        type: Boolean
    }
})

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;