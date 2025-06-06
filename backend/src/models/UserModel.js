const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    gender: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

module.exports = mongoose.model('admin', userSchema);