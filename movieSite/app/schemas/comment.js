var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
  movie:{type:ObjectId,ref:'Movie'},
  from:{type:ObjectId,ref:'User'},
  to:{type:ObjectId,ref:'User'},
  rely:[{
    from:{type:ObjectId,ref:'User'},
    to:{type:ObjectId,ref:'User'},
    content:String
  }],
  content:String,
  meta:{
    createAt:{
      type:Date,
      default:Date.now()
    },
    updateAt:{
      type:Date,
      default:Date.now()
    }
  }
});

commentSchema.pre('save',(next)=>{
  if(this.isNew){
    this.createAt = this.updateAt = Date.now();
  }else{
    this.updateAt = Date.now();
  }
  next();
})

commentSchema.statics = {
  fetch: function(cb){
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id,cb){
    return this
      .findOne({_id:id})
      .exec(cb)
  }
}

module.exports = commentSchema;