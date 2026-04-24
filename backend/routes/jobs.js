const express = require ('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

//POST A JOB - only companies can do this 
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, ctc, jobLocation, driveLocation, category, eligibleBranches, vacancies, lastDateToApply } = req.body;
        
        // Only companies can post jobs
        if(req.user.role !== 'company') {
            return res.status(403).json({ message: 'Only companies can post jobs'});
        }

        const job = new Job({
            title,
            description,
            ctc,
            jobLocation,
            driveLocation,
            category,
            eligibleBranches,
            vacancies,
            lastDateToApply,
            postedBy: req.user.userId
        });

        await job.save();
        res.status(201).json({ message: 'Job posted successfully', job });
    }catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET ALL JOBS - anyone can view the list of jobs
router.get('/', async (req, res)=> {
    try {
        const jobs = await Job.find()
            .populate('postedBy', 'name email')
            .sort({ createdAt: -1 }); // Sort by most recent
        
        res.json(jobs);
    } catch(err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;