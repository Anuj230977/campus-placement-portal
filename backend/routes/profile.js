const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const authMiddleware = require('../middleware/authMiddleware');

//CREATE OR UPDATE PROFILE - students only
router.post('/', authMiddleware, async (req, res) => {
    try{
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can create a profile'});
        }

        const {
            branch, cgpa, tenthPercentage, twelfthPercentage, 
            activeBacklogs, totalBacklogs, semesterResults,
            internships, projects, certifications,
            workExperience, skills, phone
        } = req.body;

        //Check if profile already exists
        let profile = await Profile.findOne({ user: req.user.userId });

        if (profile) {
            //Update existing profile
            profile = await Profile.findOneAndUpdate(
                { user: req.user.userId },
                { $set: req.body },
                { new: true }
            );
            return res.json({ message: 'Profile updated successfully', profile });
        }

        //Create new profile 
        profile = new Profile({
            user: req.user.userId,
            branch, cgpa, tenthPercentage, twelfthPercentage,
            activeBacklogs, totalBacklogs, semesterResults,
            internships, projects, certifications,
            workExperience, skills, phone
        });

        await profile.save();
        res.status(201).json({ message:'Profile created successfully', profile });

    } catch (err){
        res.status(500).json({ message: 'Error creating/updating profile', error: err.message });
    }
});

//GET OWN PROFILE - students only
router.get('/me', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: 'Only students can view their profile' });
        }

        const profile = await Profile.findOne({ user: req.user.userId })
            .populate('user', 'name email');

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found, please create one'});
        }
        
        res.json(profile);

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//GET STUDENT PROFILE BY ID - company only
router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== 'company') {
            return res.status(403).json({ message: 'Only companies can view student profiles' });
        }

        const profile = await Profile.findOne({ user: req.params.userId })
            .populate('user', 'name email');

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);

    } catch (err) {
        res.status(500).json({ message: 'Server error ', error: err.message });
    }
});

module.exports = router;
