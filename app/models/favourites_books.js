var mongoose = require('mongoose');

// Schema for books
var favourite_bookSchema = mongoose.Schema({
    author: { type: Object },
    book: { type: Object },
    date: { type: Date, default: Date.now }
});
var favourite_Book = module.exports = mongoose.model('favourite_Book', favourite_bookSchema);
// get favBooks
module.exports.getFavBooks = function(callback, limit) {
    favourite_Book.find(callback).limit(limit);
    }
    // get favBook
module.exports.getFavBookById = function(id, callback) {
    favourite_Book.findById(id, callback);
    }
    // add favBook 
module.exports.addFavBook = function(favouriteBook, callback) {
    favourite_Book.create(favouriteBook, callback);
    }
    // delete favBook 
module.exports.deleteFavBook = function(id, callback) {
    var query = { _id: id };
    favourite_Book.remove(query, callback);
}