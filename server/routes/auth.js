const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // 👈 ADDED THIS
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/authMiddleware.js');
const admin = require('../middleware/adminMiddleware.js'); // 👈 ADDED THIS

// @route   POST api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ msg: "User registered successfully!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role }, 
            process.env.JWT_SECRET || 'anshu_secret_key_2026', 
            { expiresIn: '1h' }
        );

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/auth/user
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/auth/users
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/auth/user/:id
router.delete('/user/:id', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/auth/stats
// @desc    Get total user and file counts for Admin
router.get('/stats', [auth, admin], async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        
        // We use the collection name directly to avoid "Missing Schema" errors
        const fileCount = await mongoose.connection.db.collection('vaults').countDocuments();
        
        res.json({ users: userCount, files: fileCount });
    } catch (err) {
        console.error("Stats Error:", err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;