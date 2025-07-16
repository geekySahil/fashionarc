const express = require('express')
const { getAllAdminOrders, getOrderDetails, updateOrderStatus } = require('../../controllers/shopping/orders-controller')

const router = express.Router()

router.get('/get', getAllAdminOrders)
router.get('/order-details/:orderId', getOrderDetails)
router.put('/update-status', updateOrderStatus)


module.exports = router