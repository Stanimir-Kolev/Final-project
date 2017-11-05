var mongoose = require('mongoose');

// Schema for books
var to_read_bookSchema = mongoose.Schema({
    author: { type: Object },
    book: { type: Object },
    date: { type: Date, default: Date.now }
});
var to_read_Book = module.exports = mongoose.model('to_read_Book', to_read_bookSchema);
// get readstillBooks
module.exports.getToReadBooks = function(callback, limit) {
        to_read_Book.find(callback).limit(limit);
    }
    // get readstillBooks
module.exports.getToReadBookById = function(id, callback) {
        to_read_Book.findById(id, callback);
    }
    // add readstillBooks 
module.exports.addToReadBook = function(toreadBook, callback) {
        to_read_Book.create(toreadBook, callback);
    }
    // delete readstillBooks 
module.exports.deleteToReadBook = function(id, callback) {
    var query = { _id: id };
    to_read_Book.remove(query, callback);
}