const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/user");
const jwtSecret = require("../config/jwt-config");

/// Users Controllers ///

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
                model.User.findOne({
                    where: {
                        username: req.body.username
                    }
                }).then(user => {
                    const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
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


/* User Register Controller */
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
                    email: req.body.email,
                    username: req.body.username,
                };
                console.log(data);
                model.User.findOne({
                    where: {
                        username: data.username,
                    },
                }).then(user => {
                    user
                        .update({
                            first_name: data.first_name,
                            last_name: data.last_name,
                            email: data.email,
                        })
                        .then(() => {
                            res.status(200).send({ message: 'user created' });
                        });
                });
            });
        }
    })(req, res, next);
};


/* Check Username availability */
exports.nameCheck = async (req,res)=>{
    model.User.findOne({
        where: {
            username: req.params.username
        }
    }).then(user => {
        console.log("user");
        if(user!==null){
            return   res.status(302).send({found:true})
        }
        res.status(201).send({found:false})

    })
};