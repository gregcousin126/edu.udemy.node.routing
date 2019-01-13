var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const Page = require('./app/models/pages');
global.rootPath = __dirname;

// auto create if not exists
mongoose.connect('mongodb://127.0.0.1/smartgroup');

// création du server
var app = express();

// view engine setup // app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// bind middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// path change which os. use path module for better compatibility // window : // C:\User\quentin\smartgroup\public // UNIX : /home/quentin/smartgroup/public
// __dirname -> /home/..../smartgroup ou C:\...\smartgoup // "public" -> join // with '/' or '\' ? // path.join resolve this problem for you ! ;)
app.use(express.static(path.join(__dirname, 'public')));

// récupération des fichiers de routing
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pagesRouter = require('./routes/pages');

app.use(function(req, res, next) {next();}); // middleware without path param -> match with every request
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages', pagesRouter);

// asyc - await
  (async function() {
    let page = null;
    try {page = await Page.findOne({name: 'home'});} catch (e) {}
    if (page === null) {
      app.get('/home', (req, res) => {
      res.send('home');
    });
    } else {
      console.log('page is NOT null');
      app.get('/home', (req, res) => {
      res.send(page.html);
      });
    }})();
    app.use('/creator', (req, res) => {
      res.render('creator', {});
    });
    app.listen( 8080, () => {
      console.log('hello', path.join(__dirname, 'public'));
  });

module.exports = app;