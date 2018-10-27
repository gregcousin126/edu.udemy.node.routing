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

// middleware without path param -> match with every request
app.use(function(req, res, next) {
  console.log('hello world only in console');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pages', pagesRouter);

// asyc // await
(async function() {
  let page = null;
  try {
    page = await Page.findOne({name: 'home'});
  } catch (e) {
    console.log('oulala une erreur de db');
    console.log(e);
  }

  console.log(page);
  if (page === null) {
    console.log('page is null');
    app.get('/home', (req, res) => { res.send('home'); });
  } else {
    console.log('page is NOT null');
    app.get('/home', (req, res) => { res.send(page.html); });
  }
})();

app.use('/creator', (req, res) => {
  res.render('creator', {});
});

app.listen(8080, () => {
  console.log('hello', path.join(__dirname, 'public'));
});

module.exports = app;


// * notes:
// res.send('Hello World'); // end the request and send data to client
// /pages/home/edit
//  protety=html&value=helloworld
// app.post('/pages/:name', async (req, res) => {
//   const name = req.params.name;
//   let page = new Page();
//   page.name = name;
//   page.html = '<p>Empty page</p>';
//   let result;
//   try {
//    result = await page.save();
//   }
//   catch(e) {
//     result = e;
//   }
//   res.send(result);
// });
// catch 404 and forward to error handler
// app.use -> declare a middleware
// app.use(function(req, res, next) {
//   next(createError(404));
//   throw new Error();
// });
// error handler
// app.use(function(err, req, res, next) {
// 	console.log("je suis le gestionnaire")
//   set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });