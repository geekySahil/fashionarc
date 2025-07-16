const express = require('express')
const { addFeatureImage, getFeatureImages, deleteFeatureImage } = require('../../controllers/common/featureImage-controller')

const router = express.Router()


router.post('/add', addFeatureImage)
router.get('/get', getFeatureImages)
router.delete('/:imageId', deleteFeatureImage)

module.exports = router
