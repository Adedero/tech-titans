const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema({
    isAcceptingResponses: {
        type: Boolean,
        required: true
    }
})

module.exports = new mongoose.model('Auth', AuthSchema)