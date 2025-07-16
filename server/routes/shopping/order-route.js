const express = require('express')
const {createOrder, capturePayment, getAllShoppingOrders,getOrderDetails} = require('../../controllers/shopping/orders-controller.js')

const router = express.Router()


router.post('/create', createOrder)
router.post('/capture', capturePayment)
router.get('/get/:userId', getAllShoppingOrders)
router.get('/details/:orderId', getOrderDetails)



module.exports = router