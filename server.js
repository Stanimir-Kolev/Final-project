//packages
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan'); /// За рекуестите в браузъра GET POST и т.н.;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router(); // refinirenae na router
var appRoutes = require('./app/routes/api')(router); // callvame faila ot app/routes/api.js // izpolzvai router objecta s tezri routes
// var bookRouter = express.Router();
// var bookRoutes = require('./app/routes/books')(bookRouter)
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);
var Book = require('./app/models/books');
var Review = require('./app/models/reviews');
var favourite_Book = require('./app/models/favourites_books');
var read_Book = require('./app/models/read_books');
var still_read_Book = require('./app/models/still_read_books');
var to_read_Book = require('./app/models/to_read_books');
var Coment = require('./app/models/coment');
// middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); // за parsvane na application/json;
app.use(bodyParser.urlencoded({ extended: true })); // за parsvane application/x-www-fore-urlencoded
app.use(express.static(__dirname + '/public')); // static files ... __dirname - kuvto i da e fila /public
app.use('/api', appRoutes); // tuka go izpolzvame
// app.use('/books', bookRoutes);

// Connectva се към дата базата чрез този порт.;
// Може да го сложим в друга папка.;
// mongodb connection
// mongoose.Promise = global.Promise;// nz taka pishe v neta za premahvane na promise errora?
mongoose.connect('mongodb://ivan:ivan@ds237445.mlab.com:37445/bookshelf', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err);
        // може да thrownem error
    } else {
        console.log('Successfuly connected to MongoDB');
    }
});

// get books
app.get('/books', function(req, res) {
    Book.getBooks(function(err, books) {
        if (err) {
            throw err;
        }
        res.json(books)
    });
});
// get book
app.get('/books/:_id', function(req, res) {
    Book.getBookById(req.params._id, function(err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});
// add book
app.post('/books', function(req, res) {
    var book = req.body;
    Book.addBook(book, function(err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});
// edit book
app.put('/books/:_id', function(req, res) {
    var id = req.params._id;
    var book = req.body;
    Book.editBook(id, book, {}, function(err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});
// delete book
app.delete('/books/:_id', function(req, res) {
    var id = req.params._id;
    Book.deleteBook(id, function(err, book) {
        if (err) {
            throw err;
        }
        res.json(book)
    });
});

// za reviews ///////////

// get reviews
app.get('/reviews', function(req, res) {
    Review.getReviews(function(err, reviews) {
        if (err) {
            throw err;
        }
        res.json(reviews)
    });
});
// get review
app.get('/reviews/:_id', function(req, res) {
    Review.getReviewById(req.params._id, function(err, review) {
        if (err) {
            throw err;
        }
        res.json(review)
    });
});
// add review
app.post('/reviews', function(req, res) {
    var review = req.body;
    Review.addReview(review, function(err, review) {
        if (err) {
            throw err;
        }
        res.json(review)
    });
});

// delete review
app.delete('/reviews/:_id', function(req, res) {
    var id = req.params._id;
    Review.deleteReview(id, function(err, review) {
        if (err) {
            throw err;
        }
        res.json(review)
    });
});

// za comments ///////

// get coments
app.get('/coments', function(req, res) {
    Coment.getComent(function(err, coments) {
        if (err) {
            throw err;
        }
        res.json(coments)
    });
});

// get comment po kniga
app.get('/coments/:_id', function(req, res) {
    Coment.getComentById(req.params._id, function(err, coments) {
        if (err) {
            throw err;
        }
        res.json(coments)
    });
});
// add comments
app.post('/coments', function(req, res) {
    var coment = req.body;
    Coment.addComent(coment, function(err, coment) {
        if (err) {
            throw err;
        }
        res.json(coment)
    });
});
// edit coment 
app.put('/coments/:_id', function(req, res) {
    var id = req.params._id;
    var coment = req.body;
    Coment.editComent(id, coment, {}, function(err, coment) {
        if (err) {
            throw err;
        }
        res.json(coment)
    });
});
// delete coment
app.delete('/coments/:_id', function(req, res) {
    var id = req.params._id;
    Coment.deleteComent(id, function(err, coment) {
        if (err) {
            throw err;
        }
        res.json(coment)
    });
});


// favourites_Books //////////////////////////////

// get favbooks
app.get('/favbooks', function(req, res) {
    favourite_Book.getFavBooks(function(err, favouriteBooks) {
        if (err) {
            throw err;
        }
        res.json(favouriteBooks)
    });
});
// get favbooks currentUser id
app.get('/favbooks/:_id', function(req, res) {
    favourite_Book.getFavBookById(req.params._id, function(err, favouriteBook) {
        if (err) {
            throw err;
        }
        res.json(favouriteBook)
    });
});
// add favbooks
app.post('/favbooks', function(req, res) {
    var book = req.body;
    favourite_Book.addFavBook(book, function(err, favouriteBook) {
        if (err) {
            throw err;
        }
        res.json(favouriteBook)
    });
});
// delete favbooks
app.delete('/favbooks/:_id', function(req, res) {
    var id = req.params._id;
    favourite_Book.deleteFavBook(id, function(err, favouriteBook) {
        if (err) {
            throw err;
        }
        res.json(favouriteBook)
    });
});

// read_Books //////////////////////////////

// get readbooks
app.get('/readbooks', function(req, res) {
    read_Book.getReadBooks(function(err, readBooks) {
        if (err) {
            throw err;
        }
        res.json(readBooks)
    });
});
// get readbooks currentUser id
app.get('/readbooks/:_id', function(req, res) {
    read_Book.getReadBookById(req.params._id, function(err, readBooks) {
        if (err) {
            throw err;
        }
        res.json(readBooks)
    });
});
// add readbooks
app.post('/readbooks', function(req, res) {
    var book = req.body;
    read_Book.addReadBook(book, function(err, readBooks) {
        if (err) {
            throw err;
        }
        res.json(readBooks)
    });
});
// delete readbooks
app.delete('/readbooks/:_id', function(req, res) {
    var id = req.params._id;
    read_Book.deleteReadBook(id, function(err, readBooks) {
        if (err) {
            throw err;
        }
        res.json(readBooks)
    });
});



// still_read_Books //////////////////////////////

// get stillreadbooks
app.get('/stillreadbooks', function(req, res) {
    still_read_Book.getStillReadBooks(function(err, stillreadBooks) {
        if (err) {
            throw err;
        }
        res.json(stillreadBooks)
    });
});
// get stillreadbooks currentUser id
app.get('/stillreadbooks/:_id', function(req, res) {
    still_read_Book.getStillReadBookById(req.params._id, function(err, stillreadBooks) {
        if (err) {
            throw err;
        }
        res.json(stillreadBooks)
    });
});
// add stillreadbooks
app.post('/stillreadbooks', function(req, res) {
    var book = req.body;
    still_read_Book.addStillReadBook(book, function(err, stillreadBooks) {
        if (err) {
            throw err;
        }
        res.json(stillreadBooks)
    });
});
// delete stillreadbooks
app.delete('/stillreadbooks/:_id', function(req, res) {
    var id = req.params._id;
    still_read_Book.deleteStillReadBook(id, function(err, stillreadBooks) {
        if (err) {
            throw err;
        }
        res.json(stillreadBooks)
    });
});



// to_read_Books //////////////////////////////

// get toreadbooks
app.get('/toreadbooks', function(req, res) {
    to_read_Book.getToReadBooks(function(err, toreadBooks) {
        if (err) {
            throw err;
        }
        res.json(toreadBooks)
    });
});
// get toreadbooks currentUser id
app.get('/toreadbooks/:_id', function(req, res) {
    to_read_Book.getToReadBookById(req.params._id, function(err, toreadBooks) {
        if (err) {
            throw err;
        }
        res.json(toreadBooks)
    });
});
// add toreadbooks
app.post('/toreadbooks', function(req, res) {
    var book = req.body;
    to_read_Book.addToReadBook(book, function(err, toreadBooks) {
        if (err) {
            throw err;
        }
        res.json(toreadBooks)
    });
});
// delete toreadbooks
app.delete('/toreadbooks/:_id', function(req, res) {
    var id = req.params._id;
    to_read_Book.deleteToReadBook(id, function(err, toreadBooks) {
        if (err) {
            throw err;
        }
        res.json(toreadBooks)
    });
});





app.get('*', function(req, res) {
    // current path i joivame s drugoto ... * - kakvoto i da klikne tam da go prati // windows
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
})


// server port
app.listen(port, function() {
    console.log('Running the server on port: ' + port); // na koi port slusha 
});