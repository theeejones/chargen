var express = require('express');
var bp = require('body-parser');
var session = require('express-session');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

require('./server/config/mongoose.js');

app.use(session({
    secret: 'secretpassword',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(express.static(path.join(__dirname, './client/dist')));

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8000, function() {
    console.log('listening on port 8000');
});