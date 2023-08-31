const express = require('express');
const multer = require('multer');
const router = express.Router();
const Post = require('../models/post');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        const error = new Error('Invalid mimetype');
        if (isValid) {
            error = null;
        }
        cb(error, 'backend/images');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cd(null, name + '-' + Date.now() + '.' + ext);
    }
})

router.post('', multer(storage).single('image'), (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(data => {
        res.status(201).json({
            message: 'Post Created Successfully',
            postId: data._id
        })
    });
})

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({
            messsage: 'Updated Successfully'
        })
    })
})

router.get('', (req, res, next) => {
    Post.find().then((posts) => {
        res.status(200).json({
            message: 'Posts Fetch Successfully',
            posts: posts
        })
    })
})

router.get('/:id', (req, res, next) => {
    Post.findOne({ _id: req.params.id }).then((post) => {
        res.status(200).json({
            message: 'Post Fetch Successfully',
            post: post
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Post Deleted Successfully'
        })
    })
})

module.exports = router;