"use strict";

var db          = require('../models');

var isAuthenticated = function isAuthenticated(req, res, next) {
    var Auth = db.auth;
    var User = db.user;
    // do any checks you want to in here

    var cookie = req.cookies.penguins_auth;
    if(cookie){
        Auth.accessToken.verifyToken(cookie, function(err, is_correct, model){
            if(is_correct){
                for (var name in req.header){ 
                    res.setHeader(name, req.header[name]);
                };
                User.findById(model.user_id, function(err, user){
                    if(user){
                        req.headers['user'] = user;
                        return next();
                    }
                }); 
            }
        });
    }else{
        // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
        res.redirect('/');
    }
}

module.exports.isAuthenticated = isAuthenticated;
