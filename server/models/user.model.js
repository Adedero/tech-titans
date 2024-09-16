const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    imageURL: {
        type: String,
    },
    fullName: {
        type: String,
        required: true
    },
    regNumber: {
        type: String,
        required: true,
    },
    nickname: String,
    birthday: String,
    hobbies: String,
    relStatus: String,
    faveQuote: String,
    faveCourse: String,
    faveLecturer: String,
    mostStressfulLevel: String,
    classCrush: String,
    whatNext: String,
})

module.exports = new mongoose.model('User', UserSchema)