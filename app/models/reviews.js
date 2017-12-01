var mongoose = require('mongoose');


// Schema for review
function NewRating() {
    this.ratingStat = [1];
    this.userId = [0]
}

var reviewSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    description: { type: String },
    publisher: { type: String },
    pages: { type: String },
    img_url: { type: String },
    buy_url: { type: String },
    create_date: { type: Date, default: Date.now },
    rating: { type: Object, default: new NewRating },
    review: { type: String },
    user: { type: Object }
});
var Review = module.exports = mongoose.model('Review', reviewSchema);
// get Reviews
module.exports.getReviews = function(callback, limit) {
        Review.find(callback).limit(limit);
    }
    // get Review
module.exports.getReviewById = function(id, callback) {
        Review.findById(id, callback);
    }
    // add Review 
module.exports.addReview = function(review, callback) {
        Review.create(review, callback);
    }
    // edit Review 
    // module.exports.editReview = function(id, review, options, callback) {
    //         var query = { _id: id };
    //         var edit = {
    //             title: review.title,
    //             author: review.author,
    //             genre: review.genre,
    //             description: review.description,
    //             publisher: review.publisher,
    //             pages: review.pages,
    //             img_url: review.img_url,
    //             buy_url: review.buy_url,
    //             rating: review.rating
    //         };
    //         Review.findOneAndUpdate(query, edit, options, callback);
    //     }
    // delete Review 
module.exports.deleteReview = function(id, callback) {
    var query = { _id: id };
    Review.remove(query, callback);
}