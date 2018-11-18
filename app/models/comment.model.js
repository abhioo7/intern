const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment',CommentSchema);
