var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var _ = require('underscore');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
//var cookieSession = require('cookie-session');
var morgan = require('morgan');
var PORT = process.env.PORT || 8080;


var app = express();
console.log(app.get('env'));
app.locals.moment = require('moment');

mongoose.connect('mongodb://localhost/imooc');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret:'imooc',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url:'mongodb://localhost/imooc',
    collection:'sessions'
  })
}));
/*app.use(cookieSession({
  name:'session',
  keys:['imooc']
}))*/
app.use(express.static(path.join(__dirname, '/public')));

app.set('views', './app/views/pages');
app.set('view engine', 'jade');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('database connect successful!');
})

if('development' === app.get('env')){
  app.set('showStackError',true);
  app.use(morgan(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug',true);
}

require('./config/routes.js')(app);

app.listen(PORT);
console.log('the server is running at 127.0.0.1:' + PORT);
