const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const jwtSecret = require("../config/jwt-config");

/// User Controller ///

/* User Login */
exports.userLogin = (req, res, next) => {
    passport.authenticate("login", (err, users, info) => {
        if (err) {
            console.error(`error ${err}`);
        }
        if (info !== undefined) {
            console.error(info.message);
            if (info.message === "bad username") {
                res.status(401).send(info.message);
            } else {
                res.status(403).send(info.message);
            }
        } else {
            req.logIn(users, () => {
                User.findOne({
                    username: req.body.username
                }).then(user => {
                    const token = jwt.sign({id: user.id}, jwtSecret.secret, {
                        expiresIn: 60 * 60
                    });
                    res.status(200).send({
                        auth: true,
                        token,
                        message: "user found & logged in",
                        profile: user
                    });
                });
            });
        }
    })(req, res, next);
};


/* User Register */
exports.userRegister = (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            console.error(err);
        }
        if (info !== undefined) {
            res.status(403).send(info.message);
        } else {
            req.logIn(user, error => {
                const data = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    username: req.body.username,
                    password: req.body.password,
                    city: req.body.city,
                    street: req.body.street,
                    personal_id: req.body.personal_id,
                };
                User.findOne({
                    username: data.username
                }).then(user => {
                    user
                        .update({
                            first_name: data.first_name,
                            last_name: data.last_name,
                            username: data.username,
                            password: data.password,
                            city: data.city,
                            street: data.street,
                            personal_id: data.personal_id,
                        })
                        .then(() => {
                            res.status(201).send({message: 'user created'});
                        });
                });
            });
        }
    })(req, res, next);
};



