const express = require('express');
const mongoose = require('mongoose');

const { Post, User } = require('../model/posts')

const authorizeEditorOrAdmin = (req, res, next) => {
    try {
        const { role } = req.user;

        if (role === 'Editor' || role === 'Admin') {
            next();
        } else {
            res.status(403).json({ message: 'Only Editor and admin can perform this action' })
        }
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
};

const authorizeAdmin = (req, res, next) => {
    try {
        const { role } = req.user;

        if (role === 'Admin') {
            next();
        } else {
            res.status(403).json({ message: 'Only Editor and admin can perform this action' })
        }
    } catch (err) {
        res.status(500).json({ message: `${err.message}` })
    }
}

module.exports = { authorizeEditorOrAdmin, authorizeAdmin }