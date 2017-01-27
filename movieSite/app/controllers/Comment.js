var Comment = require('../models/comment.js');

exports.save = (req, res) => {
  var _comment = req.body.comment;
  var comment = new Comment(_comment);
  var rely = req.body.rely;
  if (rely) {
    rely.content = _comment.content;
    rely.from = req.session.user._id;
    var cid = req.body.commentId;
    Comment
      .findOne({_id:cid})
      .exec((err,comment)=>{
      comment.rely.push(rely);
      comment.save((err,comment)=>{
        if(err){
          console.log(err);
          return;
        }
        console.log(comment);
      })
    })
  } else {
    comment.save((err, comment) => {
      if (err) {
        console.log(err);
        return;
      }
    })
  }
    res.redirect('/admin/movie/' + comment.movie);
}
