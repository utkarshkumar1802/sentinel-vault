const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    role: { 
        type: String, 
        default: 'user',
        enum: ['user', 'admin'] // Ensures only these two roles can exist
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


 /** PRE-SAVE HOOK
 * Hashes password automatically before saving to MongoDB
 */
// server/models/User.js
// server/models/User.js

UserSchema.pre('save', async function() {
    // 1. Only hash if the password is new or being modified
    if (!this.isModified('password')) return;

    try {
        // 2. Generate Salt and Hash
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        
        // No 'next()' needed here! Mongoose waits for this async function to resolve.
    } catch (err) {
        console.error("Encryption Error:", err);
        throw new Error("Password hashing failed");
    }
});

/**
 * INSTANCE METHOD
 * Compares entered password with the hashed password in DB
 */
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);