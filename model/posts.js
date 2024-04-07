const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: { // not required though 
        type: String,
        required: false
    },
    role: {
        type: String,
        enum: ['Admin', 'Editor', 'Viewer'],
        default: 'Viewer'
    }
});

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

module.exports = {

    Post: mongoose.model('Posts', PostSchema),
    User: mongoose.model('User', UserSchema)
}