const Router = require('express')
const { fetchAllFilterProducts, fetchProductDetails, searchProducts } = require('../../controllers/shopping/shopping-controller.js')

const router = Router()

router.get('/get', fetchAllFilterProducts);
router.get('/:id', fetchProductDetails)
router.get('/search/:query', searchProducts)

module.exports = router