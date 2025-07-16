const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    productId: String,
    userId: String,
    username: String,
    reviewMessage: String,
    reviewRating: Number

}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review