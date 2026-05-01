const express = require ('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

//POST A JOB - only companies can do this 
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, ctc, jobLocation, driveLocation, category, jobType, eligibleBranches, vacancies, lastDateToApply } = req.body;
        
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
            jobType,
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
        const jobs = await Job.find({
            lastDateToApply: { $gte: new Date() } // Only show jobs that are still open for applications
        })
            .populate('postedBy', 'name email')
            .sort({ lastDateToApply: 1 });
        
        res.json(jobs);
    } catch(err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//GET SINGLE JOB BY ID
router.get('/:id', async (req,res)=> {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'name email');
        
        if(!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json(job);

    } catch(err) {
        res.status(500).json({ message: 'server error', error: err.message });
    }
});

module.exports = router;