let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let session = require('express-session');
let User = mongoose.model('User');

module.exports = {
    login: (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if(err)
                res.json(err.errors);
            else {
                bcrypt.compare(req.body.password, user.password, function(err, res) {
                    if(res) {
                        session.user_id = user._id;
                        res.json(user);
                    } else {
                        res.json(err.errors);
                    } 
                });
            }
        });
    },
    register: (req, res) => {
        let user = new User(req.body);
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            if(err) {
                res.json(err.errors);
            }
            else {
                user.password = hash;
            }
        });
        user.save((err) => {
            if(err) {
                res.json(err.errors)
            }
            else {
                User.findOne({email: req.body.email}, (err, newuser) => {
                    if(err) {
                        res.json(err.errors);
                    }
                    else {
                        res.json(newuser);
                    }
                })
            }
        });
    }
};