var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//require('./app_api/models/db');
var uglifyJs = require("uglify-js");
var fs = require('fs');

//var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
// var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
//app.set('view engine', 'jade');
var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
    });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Allow cross origin access.
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


var appClientFiles = [
    'app_client/app.js',
    'app_client/controller/home.controller.js',
    'app_client/controller/user.controller.js',
    'app_client/controller/addUser.controller.js',
    'app_client/controller/addRole.controller.js',
    'app_client/controller/login.controller.js',
    'app_client/controller/app.controller.js',
    'app_client/controller/role.controller.js',
    'app_client/controller/userRole.controller.js',
    'app_client/controller/auth.controller.js',
    'app_client/controller/map.controller.js',
    'app_client/controller/secapp.controller.js',
    'app_client/common/filters/addHtmlLinebreaks.filter.js',
    'app_client/services/user.service.js',
    'app_client/services/login.service.js',
    'app_client/services/app.service.js',
    'app_client/services/role.service.js',
    'app_client/services/auth.service.js',
    'app_client/services/map.service.js',
//    'app_client/services/util.service.js',
    'app_client/common/directives/navigation/navigation.directive.js',
    'app_client/common/directives/footerGeneric/footerGeneric.directive.js',
    'app_client/common/directives/pageHeader/pageHeader.directive.js',
];
var uglified = uglifyJs.minify(appClientFiles, {
    mangle: false,
    compress: false
});

fs.writeFile('public/angular.fisec/fisec.min.js', uglified.code, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Script generated and saved:", 'fisec.min.js');
    }
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'app_client')));
//app.use(express.static(path.join(__dirname, 'app_client_view')));


// fake fiwareApp and siteWhereApp
app.get('/fiwareApp', function(req, res){
    res.json({"message": "this message is returned from a fake fiwareApp by get"});
});
app.post('/fiwareApp', function(req, res){
    res.json({"message": "this message is returned from a fake fiwareApp by post"});
});
app.get('/siteWhereApp', function(req, res){
    res.json({"message": "this message is returned from a fake siteWhereApp by get"});
});
app.post('/fiwareApp', function(req, res){
    res.json({"message": "this message is returned from a fake siteWhereApp by post"});
});

// app.use('/', routes);
app.use('/api', routesApi);

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;