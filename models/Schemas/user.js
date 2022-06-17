const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    email: String,
    user_type: String,
    bio: String,
    profile_pic: String,
    following: Array,
    followers: Number,
    cookies: Number
})