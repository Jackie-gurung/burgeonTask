const express = require('express');
const router = express.Router();
const Post = require('../model/posts');

async function generatePostId() {
    const lastpost = await Post.findOne().sort({ postId: -1 });
    return lastpos ? lastpos.postId + 1 : 1000;
}

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startindex = (page - 1) * limit;

    try {
        const posts = await Post.find().skip(startindex).limit(limit);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err })
    }
})

// get a specific post  
router.get('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await Post.findOne(postId);
        if (!post) {
            return res.status(404).json({ message: 'post of asked id not found' })
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

const beforeAM = 5;

router.post('/posts', async (req, res) => {
    try {
        const currentTime = new Date();
        const restrictAM = new Date(currentTime);
        restrictAM.setHours(beforeAM, 0, 0, 0);

        if (currentTime < restrictAM) {
            return res.status(403).json({ message: `you can create post after ${beforeAM} AM only` })
        }
        const { title, content, tags } = req.body;
        const post = new Post({
            postId: await generatePostId(),
            title,
            content,
            tags
        });
        console.log(savedPost)

        const savedPost = await post.save();
        res.status(201).json(savedPost)
    } catch (err) {
        console.log("this is from post catch error")
        res.status(400).json({ message: err.message })
    }
})

router.put('/posts/:id', async (req, res) => {
    const postId = req.params.id;
    // const updatePost = req.body;
    try {
        const post = await Post.findOne(postId);
        if (!post) {
            return res.status(404).json({ message: 'post of asked id not found' })
        }

        const newTags = req.body.newTags || [];
        const today = new Date();
        const specifiedPeriodStartDate = new Date(today);
        specifiedPeriodStartDate.setDate(today.getDate() - 7);

        if (newTags.length > 0 && post.createdAt >= specifiedPeriodStartDate) {
            post.tags = [...post.tags, ...newTags]
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;

        const updatedPost = await post.save()
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/posts/;id', async (req, res) => {
    const postId = req.params.id;
    try {
        const removePost = await Post.findOneAndDelete({ postId })
        res.json(removePost);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})



module.exports = router;