var Movie = require('../models/movie.js');
var Category = require('../models/category.js');
//index page
exports.index = (req, res) => {
  Category
    .find()
    .populate('movies')
    .exec((err,categories)=>{
    if(err){
      console.log(err);
      return;
    }
    console.log(categories);
    res.render('index', {
      title: 'imooc 首页',
      categories:categories
    })
  })
}
