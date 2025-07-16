const mongoose = require('mongoose')


const featureImageSchema = new mongoose.Schema({
    image: String,
}, {timestamps: true })

const Feature = mongoose.model('Feature', featureImageSchema)

module.exports = Feature