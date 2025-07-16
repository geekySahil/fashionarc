const express = require('express')
const { addReview, getAllReviews } = require('../../controllers/shopping/review-controller')

const router = express.Router()

router.post('/add', addReview)
router.get('/:productId', getAllReviews)

module.exports =  router