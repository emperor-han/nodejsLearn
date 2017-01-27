var Category = require('../models/category.js');

//admin new page
exports.new = (req, res) => {
  res.render('category_admin', {
    title: 'imooc  后台分类录入页',
    category: {}
  });
}

exports.save = (req, res) => {
  var _category = req.body.category;
  var category = new Category(_category);
  category.save((err, category) => {
    if (err) {
      console.log(err);
      return;
    }
  })
  res.redirect('/admin/category/list');
}


// list page
exports.list = function(req, res) {
  Category
    .find()
    .populate({path:'movies',options:{limit:5}})
    .exec((err, categories) => {
      if (err) handleError(err);
      res.render('categoryList', {
        title: "imooc 列表页",
        categories: categories
      })
    })
}
