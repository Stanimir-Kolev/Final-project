var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan'); /// За рекуестите в браузъра GET POST и т.н.;
var mongoose = require('mongoose');
var User = require('./app/models/user'); // User model-a го извличаме и го слагаме тука по тази начин може да се прави без .js;
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // за parsvane na application/json;
app.use(bodyParser.urlencoded({ extended: true })); // за parsvane application/x-www-fore-urlencoded
app.use(morgan('dev'));
// Connectva се към дата базата чрез този порт.;
// Може да го сложим в друга папка.;
mongoose.connect('mongodb://localhost:27017/BookShelff', function (err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
        // може да thrownem error 
    } else {
        console.log('Successfuly connected to MongoDB');
    }
});

// route for users post 
app.post('/users', function (req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    if (req.body.username == null || req.body.username == '' || // kriteria ako e null ili prazen string da ne go puska do sledvashtoto suboshtenie
        req.body.password == null || req.body.password == '' ||
        req.body.email == null || req.body.email == '') {
        res.send('Ensure username, email, and password were provided')
    } else {
        user.save(function (err) {
            if (err) {
                res.send('Username or Email already exists!');
            } else {
                res.send('User Created');
            }
        });

    }
});

app.get('/home', function (req, res) {
    res.send('Heloo there');
});

app.listen(port, function () {
    console.log('Running the server on port: ' + port); // na koi port slusha 
});