var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
app.use(cookieParser('secret'));


const i18n = require('i18n');
i18n.configure({
   locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik 
   directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
   objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
   cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o 
   //języku aktualnie wybranym przez użytkownika
});


const session = require('express-session');
app.use(session({
    secret: 'my_secret_password',
    resave: false
}));


var indexRouter = require('./routes/index');
const employeeRouter = require('./routes/employeeRoute');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/employees', authUtils.permitAuthenticatedUser, employeeRouter);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });


    
module.exports = app;
