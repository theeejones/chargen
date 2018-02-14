let path = require('path');
let users = require('../controllers/users');
let sessions = require('../controllers/sessions');
let admin = require('../controllers/admin');


module.exports = (app) => {
    app.post('/users', users.register);

    app.post('/users/login', users.login);

    app.get('/sessions', sessions.find);

    app.delete('/sessions', sessions.delete);

    app.get('/tables/:table', admin.build_tables);

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./client/dist/index.html"));
    });
};
