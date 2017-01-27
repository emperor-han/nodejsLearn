var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var categorySchema = new Schema({
  name:String,
  movies:[{type:ObjectId,ref:'Movie'}],
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

categorySchema.pre('save',(next)=>{
  if(this.isNew){
    this.createAt = this.updateAt = Date.now();
  }else{
    this.updateAt = Date.now();
  }
  next();
})

categorySchema.statics = {
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

module.exports = categorySchema;