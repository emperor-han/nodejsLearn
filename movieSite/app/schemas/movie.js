var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var movieSchema = new Schema({
  director:String,
  title:String,
  language:String,
  country:String,
  description:String,
  flash:String,
  poster:String,
  year:Number,
  category:{
    type:ObjectId,
    ref:'Category'
  },
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

movieSchema.pre('save',(next)=>{
  if(this.isNew){
    this.createAt = this.updateAt = Date.now();
  }else{
    this.updateAt = Date.now();
  }
  next();
})

movieSchema.statics = {
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

module.exports = movieSchema;