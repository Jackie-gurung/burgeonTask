const express = require('express');
const mongoose = require('mongoose');

const { Post, User } = require('../model/posts');


const users = [
    { _id: '6611620865d5c7874c30d1e6', username: 'admin', role: 'Admin' },
    { id: 2, username: 'editor', role: 'Editor' },
    { id: 3, username: 'viewer', role: 'Viewer' }
];


const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Missing authentication token.' });
    }

    const user = users.find(user => user.username === token);

    // assume authenticated 
    if (!user) {
        return res.status(401).json({ message: 'Not authorized incalid token' })
    }

    req.user = user;
    console.log('from auth: working fine')
    next()
}


const authorizeEditorOrAdmin = async (req, res, next) => {
    try {
        console.log(req.user)
        // const userId = req.user.id.toString();
        const userId = req.user.id;

        // const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);
        // if (!isValidObjectId) {
        //     return res.status(400).json({ message: 'Invalid user ID format' });
        // }

        const user = await User.findById({ userId });
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        if (user.role !== 'Editor' && user.role !== 'Admin') {
            return res.status(403).json({ message: 'only editor and admin can do this task (post)' })
        }
        console.log('user validated')
        next();
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
};

const authorizeAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }
        if (user.role !== 'Admin') {
            return res.status(403).json({ message: 'only admin can perform this task (post)' })
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


module.exports = {
    isAuthenticated,
    authorizeEditorOrAdmin,
    authorizeAdmin
}
