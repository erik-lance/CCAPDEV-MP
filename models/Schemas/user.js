const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    isModerator:{
        type: Boolean,
        required: true
    },
    bio: String,
    profile_pic: String,
    following: Array,
    followers: Number,
    cookies: Number
})

const User = mongoose.model('User', userSchema);

module.exports = User;