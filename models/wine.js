const mongoose = require('mongoose');
const Joi = require('joi');

const reviewSchema = new mongoose.Schema({
    text: {type: String, required: true},
    rating: {type: Number, default: 0 },
})
const wineSchema = new mongoose.Schema({
    vineyard: { type: String, required: true },
    varietal: { type: String, required: true },
    pairing: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    reviews: { type: [reviewSchema], default: [] },
});

function validateRating(review) {
    const schema = Joi.object({
        rating: Joi.number().required()
    });
    return schema.validate(review)
}

const Review = mongoose.model('Review', reviewSchema);
const Wine = mongoose.model('Wine', wineSchema);
exports.Review = Review;
exports.Wine = Wine;
exports.wineSchema = wineSchema;
exports.reviewSchema = reviewSchema;
exports.validateRating = validateRating;