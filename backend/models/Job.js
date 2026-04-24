const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ctc: {
        type: String,
        required: true
    },
    jobLocation: {
        type: String,
        required: true
    },
    driveLocation: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    eligibleBranches: {
        type: [String],
        required: true
    },
    vacancies: {
        type: Number,
        required: true
    },
    applicantCount: {
        type: Number,
        default: 0
    },
    lastDateToApply: {
        type: Date,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);