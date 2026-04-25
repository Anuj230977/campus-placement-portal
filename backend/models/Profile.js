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
    semesterResults: [
        {
            semester: Number,
            cgpa: Number,
            closedBacklogs: { type: Number, default: 0 },
            liveBacklogs: { type: Number, default: 0 }   
        }
    ],
    internships: [
        {
            company: String,
            role: String,
            duration: String,
            description: String
        }
    ],
    projects: [
        {
            title: String,
            description: String,
            techStack: String,
            link: String
        }
    ],
    certifications: [
        {
            title: String,
            issuedBy: String,
            year: Number,
            duration: String,
            type: {
                type: String,
                enum: ['technical', 'non-technical']
            },
            isPaid: {
                type: Boolean,
                default: false
            }
        }
    ],
    workExperience: [
        {
            company: String,
            role: String,
            type: {
                type: String,
                enum: ['technical', 'non-technical']
            },
            duration: String,
            description: String
        }
    ],
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