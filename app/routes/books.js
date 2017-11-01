// var Book = require('../models/books');
// /// BOOKS
// module.exports = function (bookRouter) {
//     console.log('dsadsa')
//     bookRouter.get('/books', function (req, res) {
//         console.log('dsad')
//         Book.getBooks(function (err, books) {
//             if (err) {
//                 throw err;
//             }
//             console.log(books);
//             res.json(books)
//         });
//     });
//     // get book
//     bookRouter.get('/books/:_id', function (req, res) {
//         Book.getBookById(req.params._id, function (err, book) {
//             if (err) {
//                 throw err;
//             }
//             res.json(book)
//         });
//     });
//     // add book
//     bookRouter.post('/books', function (req, res) {
//         var book = req.body;
//         Book.addBook(book, function (err, book) {
//             if (err) {
//                 throw err;
//             }
//             res.json(book)
//         });
//     });
//     // edit book
//     bookRouter.put('/books/:_id', function (req, res) {
//         var id = req.params._id;
//         var book = req.body;
//         Book.editBook(id, book, {}, function (err, book) {
//             if (err) {
//                 throw err;
//             }
//             res.json(book)
//         });
//     });
//     // delete book
//     bookRouter.delete('/books/:_id', function (req, res) {
//         var id = req.params._id;
//         Book.deleteBook(id, function (err, book) {
//             if (err) {
//                 throw err;
//             }
//             res.json(book)
//         });
//     });
//     return bookRouter;
// }