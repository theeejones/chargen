let express = require('express');
let bp = require('body-parser');
let session = require('express-session');
let path = require('path');
let mongoose = require('mongoose');

let app = express();

require('./config/mongoose.js');

app.use(session({
    secret: 'secretpassword',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

let routes_setter = require('./config/routes.js');
routes_setter(app);

let server = app.listen(8000, function() {
    console.log('listening on port 8000');
});