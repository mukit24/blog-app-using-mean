const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');

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

app.use('/api/posts', postRoutes);

module.exports = app;