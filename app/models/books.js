var mongoose = require('mongoose');

// Schema for books
var bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    publisher: { type: String },
    pages: { type: String },
    img_url: { type: String },
    buy_url: { type: String },
    comments: { type: Object },
    create_date: { type: Date, default: Date.now },
    rating: { type: Object }
});
var Book = module.exports = mongoose.model('Book', bookSchema);
// get Books
module.exports.getBooks = function(callback, limit) {
        Book.find(callback).limit(limit);
    }
    // get Book
module.exports.getBookById = function(id, callback) {
        Book.findById(id, callback);
    }
    // add Book 
module.exports.addBook = function(book, callback) {
        Book.create(book, callback);
    }
    // edit Book 
module.exports.editBook = function(id, book, options, callback) {
        var query = { _id: id };
        var edit = {
            title: book.title,
            author: book.author,
            genre: book.genre,
            description: book.description,
            publisher: book.publisher,
            pages: book.pages,
            img_url: book.img_url,
            buy_url: book.buy_url,
            comments: book.comments,
            rating: book.rating
        };
        Book.findOneAndUpdate(query, edit, options, callback);
    }
    // delete Book 
module.exports.deleteBook = function(id, callback) {
    var query = { _id: id };
    Book.remove(query, callback);
}