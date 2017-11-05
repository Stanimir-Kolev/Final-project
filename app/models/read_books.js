var mongoose = require('mongoose');

// Schema for books
var read_bookSchema = mongoose.Schema({
    author: { type: Object },
    book: { type: Object },
    date: { type: Date, default: Date.now }
});
var read_Book = module.exports = mongoose.model('read_Book', read_bookSchema);
// get readBooks
module.exports.getReadBooks = function(callback, limit) {
        read_Book.find(callback).limit(limit);
    }
    // get readBooks
module.exports.getReadBookById = function(id, callback) {
        read_Book.findById(id, callback);
    }
    // add readBooks 
module.exports.addReadBook = function(readBook, callback) {
        read_Book.create(readBook, callback);
    }
    // delete readBooks 
module.exports.deleteReadBook = function(id, callback) {
    var query = { _id: id };
    read_Book.remove(query, callback);
}