var mongoose = require('mongoose');

// Schema for coment
var comentSchema = mongoose.Schema({
    author: { type: Object },
    bookId: { type: String },
    text: { type: String },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 }
});
var Coment = module.exports = mongoose.model('Coment', comentSchema);
// get Coment
module.exports.getComent = function(callback, limit) {
        Coment.find(callback).limit(limit);
    }
    // get Coment
module.exports.getComentById = function(id, callback) {
        Coment.findById(id, callback);
    }
    // add Coment 
module.exports.addComent = function(coment, callback) {
        Coment.create(coment, callback);
    }
    // edit Coment
module.exports.editComent = function(id, num, options, callback) {
        var query = { _id: id };
        var edit = {
            likes: num
        };
        Book.findOneAndUpdate(query, edit, options, callback);
    }
    // delete Coment 
module.exports.deleteComent = function(id, callback) {
    var query = { _id: id };
    Coment.remove(query, callback);
}