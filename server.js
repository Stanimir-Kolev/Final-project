//packages
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan'); /// За рекуестите в браузъра GET POST и т.н.;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();// refinirenae na router
var appRoutes = require('./app/routes/api')(router); // callvame faila ot app/routes/api.js // izpolzvai router objecta s tezri routes
// var bookRouter = express.Router();
// var bookRoutes = require('./app/routes/books')(bookRouter)
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);
var Book = require('./app/models/books');
// middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // за parsvane na application/json;
app.use(bodyParser.urlencoded({ extended: true })); // за parsvane application/x-www-fore-urlencoded
app.use(express.static(__dirname + '/public'));// static files ... __dirname - kuvto i da e fila /public
app.use('/api', appRoutes);// tuka go izpolzvame
// app.use('/books', bookRoutes);

// Connectva се към дата базата чрез този порт.;
// Може да го сложим в друга папка.;
// mongodb connection
// mongoose.Promise = global.Promise;// nz taka pishe v neta za premahvane na promise errora?
mongoose.connect('mongodb://ivan:ivan@ds237445.mlab.com:37445/bookshelf', function (err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
        // може да thrownem error
    } else {
        console.log('Successfuly connected to MongoDB');
    }
});

app.get('/books', function (req, res) {
    console.log('dsad')
    Book.getBooks(function (err, books) {
        if (err) {
            throw err;
        }
        console.log(books);
        res.json(books)
    });
});
// get book
app.get('/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});
// add book
app.post('/books', function (req, res) {
    var book = req.body;
    Book.addBook(book, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});
// edit book
app.put('/books/:_id', function (req, res) {
    var id = req.params._id;
    var book = req.body;
    Book.editBook(id, book, {}, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});
// delete book
app.delete('/books/:_id', function (req, res) {
    var id = req.params._id;
    Book.deleteBook(id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});

app.get('*', function (req, res) {
    // current path i joivame s drugoto ... * - kakvoto i da klikne tam da go prati // windows
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})


// server port
app.listen(port, function () {
    console.log('Running the server on port: ' + port); // na koi port slusha 
});