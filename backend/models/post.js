const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true }
});
// qQX0JjQcMRJPJ0g6
module.exports = mongoose.model('Post',postSchema);