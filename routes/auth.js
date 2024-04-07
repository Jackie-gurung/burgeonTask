const express = require('express');
const router = express.Router();
const { User } = require('../model/posts');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');


function generateJWT(user) {
    const payload = {
        username: user.username,
        role: user.role,
    };
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretKey);
}

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = generateJWT(user);
        console.log(token)
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;