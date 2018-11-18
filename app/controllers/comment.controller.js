const comment = require('../models/comment.model.js');

// Create and Save a new comment
exports.create = (req, res) => {
 // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "comment content can not be empty"
        });
    }

    // Create a comment
    const comment = new comment({
        title: req.body.title || "Untitled comment", 
        content: req.body.content
    });

    // Save comment in the database
    comment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the comment."
        });
    });
};

// Retrieve and return all comments from the database.
exports.findAll = (req, res) => {
 comment.find()
    .then(comments => {
        res.send(comments);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comments."
        });
    });
};

// Find a single comment with a commentId
exports.findOne = (req, res) => {
 comment.findById(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "comment not found with id " + req.params.commentId
            });            
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comment with id " + req.params.commentId
        });
    });
};

// Update a comment identified by the commentId in the request
exports.update = (req, res) => {
// Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "comment content can not be empty"
        });
    }

    // Find comment and update it with the request body
    comment.findByIdAndUpdate(req.params.commentId, {
        title: req.body.title || "Untitled comment",
        content: req.body.content
    }, {new: true})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "comment not found with id " + req.params.commentId
            });
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Error updating comment with id " + req.params.commentId
        });
    });
};

// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    comment.findByIdAndRemove(req.params.commentId)
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                message: "comment not found with id " + req.params.commentId
            });
        }
        res.send({message: "comment deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "comment not found with id " + req.params.commentId
            });                
        }
        return res.status(500).send({
            message: "Could not delete comment with id " + req.params.commentId
        });
    });
};