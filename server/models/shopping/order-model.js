const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems:[{
        productId: String,
        title: String,
        image: String,
        price: String,
        quantity: Number
    }],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        phone: String,
        pincode : String,
        notes: String
    }, 
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: String,
    orderUpdateDate: String,
    paymentId: String,
    payerId: String

}, {timestamps: true})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order