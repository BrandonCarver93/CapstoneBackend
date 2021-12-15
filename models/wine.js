const mongoose = require('mongoose');
const config = require('config');

const reviewSchema = new mongoose.Schema({
    wineId: {type: String},
    text: { type: String, required: true},
})
const wineSchema = new mongoose.Schema({
    vineyard: {type: String, required: true},
    varietal: {type: String, required: true},
    pairing: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    reviews: {type: [reviewSchema], default: []},
});

const Review = mongoose.model('Review', reviewSchema);
const Wine = mongoose.model('Wine', wineSchema);
module.exports.Review = Review;
module.exports.Wine = Wine;
module.exports.wineSchema = wineSchema;
module.exports.reviewSchema = reviewSchema;