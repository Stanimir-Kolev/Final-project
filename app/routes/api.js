// route for users post 
// routes
var User = require('../models/user'); // User model-a го извличаме и го слагаме тука по тази начин може да се прави без .js;
var jwt = require('jsonwebtoken'); // Token
var secret = 'starwars';
// USERS
module.exports = function (router) {
    // User registration route
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        user.name = req.body.name;
        if (req.body.username == null || req.body.username == '' || // kriteria ako e null ili prazen string da ne go puska do sledvashtoto suboshtenie
            req.body.password == null || req.body.password == '' ||
            req.body.email == null || req.body.email == '' ||
            req.body.name == null || req.body.name == '') {
            res.json({ success: false, message: 'Ensure username, email, and password were provided' });
        } else {
            user.save(function (err) {
                if (err) {
                    if (err.errors != null) {
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message });
                        } else if (err.errors.email) {
                            res.json({ success: false, message: err.errors.email.message });
                        } else if (err.errors.username) {
                            res.json({ success: false, message: err.errors.username.message });
                        } else if (err.errors.password) {
                            res.json({ success: false, message: err.errors.password.message });
                        } else {
                            res.json({ success: false, message: err })
                        }
                    } else if (err) {
                        if (err.code == 11000) {
                            if (err.errmsg[51] == 'u') {
                                res.json({ success: false, message: 'This username is already taken' });
                            } else if (err.errmsg[51] == 'e') {
                                res.json({ success: false, message: 'This e-mail is already taken' });
                            }
                        } else {
                            res.json({ success: false, message: err });
                        }
                    }
                } else {
                    res.json({ success: true, message: 'User Created' })
                }
            });
        }
    });


    router.post('/checkusername', function (req, res) {
        User.findOne({ username: req.body.username }).select('username').exec(function (err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                res.json({ success: false, message: 'That username is already taken' })
            } else {
                res.json({ success: true, message: 'Valid username' })
            }
        });
    });

    router.post('/checkemail', function (req, res) {
        User.findOne({ email: req.body.email }).select('username').exec(function (err, user) {
            if (err) {
                throw err;
            }
            if (user) {
                res.json({ success: false, message: 'That e-mail is already taken' })
            } else {
                res.json({ success: true, message: 'Valid e-mail' })
            }
        });
    });

    // User login route
    //http://localhost:port/api/authenticate
    //vsichko koeto se iziskva usera da ne e lognat se slaga sled tova
    router.post('/authenticate', function (req, res) {
        User.findOne({ username: req.body.username }).select('email username password id favorite').exec(function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                res.json({ success: false, message: 'Cound not authenticate user' })
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({ success: false, message: 'No password provided' });
                }

                if (!validPassword) {
                    res.json({ success: false, message: 'Cound not authenticate password' });
                } else {
                    var token = jwt.sign({ username: user.username, email: user.email, id: user.id, favorite: user.favorite }, secret, { expiresIn: '24h' });
                    res.json({ success: true, message: 'User authenticated!', token: token });
                }
            }
        });
    });
    //create // middleware za decreptirane na tokena
    // vischko koeto se izisvka usera da e lognat se slaga pod tova
    router.use(function (req, res, next) {
        // ili ot requesta ili ot URL-a ili ot headerite
        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if (token) {
            //verify token
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'Token invalid' })
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.json({ success: false, message: 'No token provided' });
        }
    });

    // functionalnost za zaqvki kum user-a get post put delete books
    // get users
    router.get('api/users', function(req, res) {
        User.getUsers(function(err, users) {
            if (err) {
                throw err;
            }
            res.json(users)
        });
    });
    // get user
    router.get('api/users/:_id', function (req, res) {
        User.getUserById(req.params._id, function (err, user) {
            if (err) {
                throw err;
            }
            res.json(user)
        });
    });

    router.post('/currentUser', function (req, res) {
        res.send(req.decoded);
    });
    return router; // returnva go kum servera
}