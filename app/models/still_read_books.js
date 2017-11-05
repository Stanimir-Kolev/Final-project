var mongoose = require('mongoose');

// Schema for books
var still_read_bookSchema = mongoose.Schema({
    author: { type: Object },
    book: { type: Object },
    date: { type: Date, default: Date.now }
});
var still_read_Book = module.exports = mongoose.model('still_read_Book', still_read_bookSchema);
// get readstillBooks
module.exports.getStillReadBooks = function(callback, limit) {
        still_read_Book.find(callback).limit(limit);
    }
    // get readstillBooks
module.exports.getStillReadBookById = function(id, callback) {
        still_read_Book.findById(id, callback);
    }
    // add readstillBooks 
module.exports.addStillReadBook = function(stillreadBook, callback) {
        still_read_Book.create(stillreadBook, callback);
    }
    // delete readstillBooks 
module.exports.deleteStillReadBook = function(id, callback) {
    var query = { _id: id };
    still_read_Book.remove(query, callback);
}