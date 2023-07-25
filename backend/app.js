const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://pranto1824:qQX0JjQcMRJPJ0g6@cluster0.mu5t5a8.mongodb.net/mean-blog?retryWrites=true&w=majority').then(()=> {
    console.log('Connected to DB');
}).catch(() => {
    console.log('connection failed');
})

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
})

app.post('/api/posts', (req,res,next) => {
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

app.get('/api/posts',(req, res, next) => {
    Post.find().then((posts) => {
        res.status(200).json({
            message: 'Posts Fetch Successfully',
            posts: posts
        })
    })
})

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then( result => {
        console.log(result);
        res.status(200).json({
            message: 'Post Deleted Successfully'
        })
    })
})

module.exports = app;