const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('', (req,res,next) => {
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

router.put('/:id', (req,res,next) => {
    const post = new Post ({
        _id: req.params.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({
            messsage: 'Updated Successfully'
        })
    })
})

router.get('',(req, res, next) => {
    Post.find().then((posts) => {
        res.status(200).json({
            message: 'Posts Fetch Successfully',
            posts: posts
        })
    })
})

router.get('/:id',(req, res, next) => {
    Post.findOne({_id: req.params.id}).then((post) => {
        res.status(200).json({
            message: 'Post Fetch Successfully',
            post: post
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then( result => {
        console.log(result);
        res.status(200).json({
            message: 'Post Deleted Successfully'
        })
    })
})

module.exports = router;