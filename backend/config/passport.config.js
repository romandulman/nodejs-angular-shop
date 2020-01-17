const BCRYPT_SALT_ROUNDS = 12;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwtSecret = require("./jwt-config");
const User = require("../models/user");


passport.use(
    'register',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
            session: false,
        },
        (req, username, password, done) => {
           // console.log(username);
           // console.log(req.body.email);

            try {
                User.findOne(//username
                   {  username: username


                }).then(user => {
                    if (user != null) {
                        console.log('username or email already taken');
                        return done(null, false, {
                            message: 'username or email already taken',
                        });
                    }
                    // bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                    User.create({
                        username,
                        password: password ,//hashedPassword,
                       // email: req.body.email,

                    }).then(user => {
                        console.log('user created');
                        return done(null, user);
                    });
                });
                //  });
            } catch (err) {
                return done(err);
            }
        },
    ),
);


passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            session: false
        },
        (username, password, done) => {
            try {
                User.findOne({

                    username:username

                }).then(user => {
                    if (user === null) {
                        return done(null, false, { message: "bad username" });
                    }

                    if ( password !== user.password) {
                        return cb(null, false, { message: "Incorrect email or password." });
                    }
                    // return cb(null, {user: user.username}, {message: 'Logged In Successfully'}); //{user}
                    return done(null, user);
                    // });
                });
            } catch (err) {
                done(err);
            }
        }
    )
);

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwtSecret.secret
};

passport.use(
    "jwt",
    new JWTstrategy(opts, (jwt_payload, done) => {
        try {
            User.findOne({

                    id: jwt_payload.id

            }).then(user => {
                if (user) {
                    console.log("user found in db in passport");
                    done(null, user);
                } else {
                    console.log("user not found in db");
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    })
);