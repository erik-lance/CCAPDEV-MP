const mongoose = require('mongoose')

const filesSchema = new mongoose.Schema({
    file_id: String,
    file_type: String,
    file_name: String,
    post_id: String
})