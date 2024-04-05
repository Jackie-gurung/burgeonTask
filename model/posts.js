const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    postId: {
        type: Number,
        unique: true,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [String]
})

module.exports = mongoose.model('Posts', PostSchema)