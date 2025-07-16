const paypal = require('../../helpers/paypal.js')
const Cart = require('../../models/shopping/cart-model.js')
const Order = require('../../models/shopping/order-model.js')
const Product = require('../../models/admin/products-model.js')


const createOrder = async(req, res) => {
    try {

        const {
            userId,
            cartId,
            cartItems,
            addressInfo, 
            orderStatus,
            paymentMethod,
            paymentStatus,
            totalAmount,
            orderDate,
            orderUpdateDate,
            paymentId,
            payerId
        } = req.body
        

        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal'
            },
            redirect_urls: {
                return_url : 'http://localhost:5173/shopping/paypal-return',
                cancel_url : 'http://localhost:5173/shopping/paypal-cancel'
            },
            transactions: [{
                item_list: {
                    items: cartItems.map((item) => {
                        return  {
                            sku: item.productId,
                            name: item.title,
                            currency: 'USD',
                            price: item.price.toFixed(2),
                            quantity: item.quantity
                        }
                    }),
                },
                amount: {
                    currency: 'USD',
                    total: totalAmount.toFixed(2)
                }, 
                description: 'none'
            }]
        }


        paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
            if(error){
                console.log('ERROR: ',error.response.details)
            

                return res.status(500).json({
                    message: 'Error: ' + error,
                    success: false
                })
            }else{
                const newlyCreatedOrder = new Order({
                    userId,
                    cartId,
                    cartItems,
                    addressInfo, 
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId
                })

                await newlyCreatedOrder.save()


                const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url').href

                res.status(201).json({
                    success: true,
                    approvalURL,
                    orderId: newlyCreatedOrder._id
                })
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Error: ' + error.message,
            success : false 
        })
    }
}

const capturePayment = async(req, res) => {
    try {

        const {orderId, payerId, paymentId} = req.body 

        // console.log('req.body>>>>>>>', req.body)

        const order = await Order.findById(orderId)

        order.payerId = payerId
        order.paymentId = paymentId
        order.paymentStatus = 'paid'
        order.orderStatus = 'confirmed'

        await order.save()

        const cart = await Cart.findByIdAndDelete(order.cartId)

        console.log('cart ', cart.items)

        // cart.items.map(async (productItem) => {
        //     const product = await Product.findById(productItem.productId)
        //     product.totalStock -= productItem.quantity
        //     await product.save()
        // })

        res.status(201).json({
            success: true,
            data: order
        })
        
    } catch (error) {
        res.status(500).json({
            message: 'Error: ' + error.message,
            success : false 
        })
    }
}


const getAllShoppingOrders = async(req, res) => {
    const {userId} = req.params

    if(!userId) {
        return res.status(404).json({
            message: 'userId not found',
            success: false
        })
    }

    const ordersList = await Order.find({userId})

    if(ordersList.length < 0){
        return res.status(404).json({
            message: 'no orders yet',
            success: false
        })
    }

    return res.status(200).json({
        success: true,
        data: ordersList
    })
}

const getOrderDetails = async (req, res) => {
    const {orderId} = req.params


    if(!orderId) {
        return res.status(404).json({
            message: 'order id is required ',
            success: false
        })
    }

    const orderDetails = await Order.findById(orderId)


    if(!orderDetails){
        return res.status(404).json({
            message: 'order not found', 
            success: false
        })
    } 

    return res.status(200).json({
        success: true,
        orderDetails
    })
}

const getAllAdminOrders = async(req, res) => {


    const allOrdersList = await Order.find({})

    if(!allOrdersList){
        return res.status(404).json({
            message: 'no orders found ', 
            success: false
        })
    }

    return res.status(200).json({
        success: true, 
        allOrdersList
    })




}


const updateOrderStatus = async(req, res) => {
    const {orderId, orderStatus} = req.body

    console.log('first', req.body)

    const updatedOrder = await Order.findByIdAndUpdate(orderId, {orderStatus})

    if(!updatedOrder) {
        return res.status(404).json({
            message: 'failed to update order status', 
            success: false
        })
    }

    console.log('updated order', updatedOrder)

    return res.status(201).json({
        success: true , 
        data : updatedOrder
    })
}


module.exports = {createOrder, capturePayment, getAllShoppingOrders, getOrderDetails, getAllAdminOrders, updateOrderStatus}