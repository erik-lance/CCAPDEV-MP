const mongoose = require('mongoose')

const filesSchema = new mongoose.Schema({
    file_id: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    file_name: {
        type: String,
        required: true
    },
    post_id: String
})

const Files = mongoose.model('Files', filesSchema);

module.exports = Files;