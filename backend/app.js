const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','*');
    next();
})

app.post('/api/posts', (req,res,next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post Created Successfully'
    })
})

app.get('/api/posts',(req, res, next) => {
    const posts = [
        {
            id: 'id1',
            title: 'post1 title',
            content: 'content from server' 
        },
        {
            id: 'id2',
            title: 'post3 title',
            content: 'content from server!!!' 
        }
    ]

    res.status(200).json({
        message: 'Posts Fetch Successfully',
        posts: posts
    })
})

module.exports = app;