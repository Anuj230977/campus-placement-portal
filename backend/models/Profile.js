const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    tenthPercentage: {
        type: Number
    },
    twelfthPercentage: {
        type: Number
    },
    activeBacklogs: {
        type: Number,
        default: 0
    },
    totalBacklogs: {
        type: Number,
        default: 0
    },
    skills: {
        type: [String]
    },
    resumeUrl: {
        type: String
    },
    phone: {
        type: String
    },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);