const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

//APPLY FOR A JOB - only students can do this
router.post('/:jobId', authMiddleware, async (req, res) => {
    try {
        // only students can apply
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can apply'});
        }

        const job = await Job.findById(req.params.jobId);
        if(!job) {
            return res.status(404).json({ message: 'Job not found'});
        }
        
        //check if deadline has passed
        if(new Date() > job.lastDateToApply) {
            return res.status(400).json({ message: 'Application deadline has passed'});
        }

        //check if already applied
        const alreadyApplied = await Application.findOne({
            job: req.params.jobId,
            student: req.user.userId
        });
        if (alreadyApplied) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const application = new Application({
            job: req.params.jobId,
            student: req.user.userId,
            resumeUrl: req.body.resumeUrl
        });

        await application.save();

        //Increase applicant count on job
        await Job.findByIdAndUpdate(req.params.jobId, {
            $inc: {applicantCount: 1}
        });

        res.status(201).json({ message: 'Application submitted successfully', application });

    } catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
});

//GET STUDENTS OWN APPLICATIONS
router.get('/my', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can view their application'});
        }

        const applications = await Application.find({ student: req.user.userId })
            .populate('job', 'title ctc jobLocation company lastDateToApply')
            .sort({ createdAt: -1});
        
        res.json(applications);

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message});
    }
});

// GET ALL APPLICATIONS FOR A JOB - company only
router.get('/job/:jobId', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'company') {
            return res.status(403).json({ message: 'Only companies can view applications'});
        }

        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        //Make sure this job belongs to this company
        if (job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized'});
        }

        const applications = await Application.find({ job: req.params.jobId })
            .populate('student', 'name email')
            .sort({ createdAt: -1});

        res.json(applications);

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message});
    }
});

//UPDATE APPLICATION STATUS - company only, after deadline
router.put('/:applicationId/status', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'company') {
            return res.status(403).json({ message: 'Only companies can update status' });
        }

        const application = await Application.findById(req.params.applicationId)
            .populate('job');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        //Check if deadline has passed 
        if (new Date() < application.job.lastDateToApply) {
            return res.status(400).json({ message: 'Cannot update status before application deadline' });
        }

        //Make sure this job belongs to this company
        if(application.job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        application.status = req.body.status;
        await application.save();

        res.json({ message: 'Status updated successfully', application });

    } catch (err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
});

module.exports = router;