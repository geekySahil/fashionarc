const Router = require('express')
const { addToCart, fetchAllCartItems, updateCartItemsQty, deleteCartItem } = require('../../controllers/shopping/cart-controller')

const router = Router()


router.post('/add', addToCart)
router.get('/get/:userId', fetchAllCartItems)
router.put('/update', updateCartItemsQty)
router.delete('/:userId/:productId', deleteCartItem)

module.exports = router