var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment.js');
var Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;