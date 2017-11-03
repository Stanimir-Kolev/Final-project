var mongoose = require('mongoose');

// Schema for coment
var comentSchema = mongoose.Schema({
    authorId: { type: String },
    bookId: { type: String },
    text: { type: String },
    create_date: { type: Date, default: Date.now },
    rating: { type: Number }
});
var Coment = module.exports = mongoose.model('Coment', comentSchema);
// get Books
module.exports.getComent = function(callback, limit) {
        Coment.find(callback).limit(limit);
    }
    // get Book
module.exports.getComentById = function(id, callback) {
        Coment.findById(id, callback);
    }
    // add Book 
module.exports.addComent = function(coment, callback) {
        Coment.create(coment, callback);
    }
    // delete Book 
module.exports.deleteComent = function(id, callback) {
    var query = { _id: id };
    Coment.remove(query, callback);
}