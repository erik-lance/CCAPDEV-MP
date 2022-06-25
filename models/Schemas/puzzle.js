const mongoose = require('mongoose')

const puzzleSchema = new mongoose.Schema({
    puzzle_id: {
        type: String,
        required: true,
        unique: true
    },
    post_id: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cookies: Number
})

const Puzzle = mongoose.model('Puzzle', puzzleSchema);

module.exports = Puzzle;