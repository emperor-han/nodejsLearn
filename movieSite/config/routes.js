var Movie = require('../app/controllers/Movie.js');
var Index = require('../app/controllers/Index.js');
var User = require('../app/controllers/User.js');
var Category = require('../app/controllers/Category.js');
var Comment = require('../app/controllers/Comment.js');


module.exports = function(app){
  //pre handle
  app.use((req,res,next)=>{
    app.locals.user = req.session.user;
    next();
  })

  //Index
  app.get('/', Index.index)


  //Movie
  app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired, Movie.update);
  app.post('/admin/movie/new', Movie.save);
  app.get('/admin/movie/list',User.signinRequired,User.adminRequired, Movie.list);
  app.delete('/admin/movie/list', Movie.del);
  app.get('/admin/movie/:id', User.signinRequired,Movie.detail);
  app.get('/admin/movie',User.signinRequired,User.adminRequired, Movie.new);

  //User
  app.post('/user/signup', User.signup);
  app.get('/admin/userlist',User.signinRequired,User.adminRequired, User.list);
  app.post('/user/signin',User.signin);
  app.get('/logout',User.logout);
  app.get('/signin',User.showSignin);
  app.get('/signup',User.showSignup);

  //Comment
  app.post('/user/comment',Comment.save);

  //Category
  app.get('/admin/category/new',User.signinRequired,User.adminRequired, Category.new);
  app.post('/admin/category',User.signinRequired,User.adminRequired, Category.save);
  app.get('/admin/category/list',User.signinRequired,User.adminRequired, Category.list);


}