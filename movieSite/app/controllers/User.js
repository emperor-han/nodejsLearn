var User = require('../models/user.js');

//signup
exports.signup = (req, res) => {
  var _user = req.body.user;
  User.findOne({ username: _user.username }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (user) {
      res.redirect('/');
    } else {
      var user = new User(_user);
      user.save((err, user) => {
        if (err) {
          console.log(err);
          return;
        }
        res.redirect("/admin/userlist");
      })
    }
  })
}

//show signin page
exports.showSignin = (req,res)=>{
  res.render('signin',{
    title:"imooc 登录页面"
  });
}

//show signup page
exports.showSignup = (req,res)=>{
  res.render('signup',{
    title:"imooc 注册页面"
  });
}

//userList page
exports.list = function(req, res) {
  User.fetch((err, users) => {
    if (err) handleError(err);
    res.render('userList', {
      title: "imooc 列表页",
      users: users
    })
  })
}

//signin
exports.signin = (req, res) => {
  var _user = req.body.user;
  var _username = _user.username;
  var _password = _user.password;
  User.findOne({ username: _username }, (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      user.comparePassword(_password, (err, isMatched) => {
        if (err) {
          console.log(err);
        }
        if (isMatched) {
          req.session.user = user;
          res.redirect('/');
        } else {
          res.send('password is wrong');
        }
      })
    } else {
      res.send('user is not exist!');
    }
  })
}

//logout
exports.logout = (req, res) => {
  delete req.session.user;
  res.redirect('/');
}

//middleware
exports.signinRequired = (req,res,next)=>{
  var user = req.session.user;
  if(!user){
    res.redirect('/signin');
  }
  next();
}

exports.adminRequired = (req,res,next)=>{
  var user = req.session.user;
  if(user.role <= 10){
    res.redirect('/signin');
  }
  next();
}