const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//SIGNUP
router.post('/signup', async (req, res)=> {
    try {
        const { name, email, password, role } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: 'Email already registered'});
        }

        //Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create new user
        const user = new User({ name, email, password: hashedPassword, role});
        await user.save();

        res.status(201).json({ message: 'User registered successfully'});

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message});
    }
});

//LOGIN
router.post('/login', async (req, res)=> {
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        //check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password'});
        }

        //create JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({ token, role:user.role, name: user.name});

    }catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
