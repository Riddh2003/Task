const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'active'
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'admin',
    }
}, { timestamps: true });

module.exports = mongoose.model('Projects', projectSchema);