const { default: mongoose } = require("mongoose")
const Product = require("../../models/admin/products-model")
const Cart = require("../../models/shopping/cart-model")

const addToCart = async(req, res) => {
    try {
        const {productId, userId, quantity} = req.body

        // console.log('GOT HITTTTT', userId, productId)

        if(!productId || !userId || !quantity){
            res.status(400).json({
                success:false,
                message: 'All Feilds are required'
            })
        }     

        let cart = await Cart.findOne({userId})


        if(!cart) {
            
            cart = new Cart({
                userId, 
                items: []
            })
        }

        const findCurrentProductIndex = cart.items?.findIndex((item) => item.productId.toString() === productId) 
        

        if(findCurrentProductIndex > -1){
            cart.items[findCurrentProductIndex].quantity += quantity
        }else{
            cart.items.push({
                productId, 
                quantity
            })
        }

        const product = await Product.findById(productId)
        console.log('quantity', quantity)
        product.totalStock -= quantity
        console.log('product stock ', product.totalStock)
        await product.save()


          


        await cart.save()


        return res.status(201).json({
            success: true, 
            data: cart
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error Occured' + error
        })
    }
}

const fetchAllCartItems = async(req, res) => {
    try {
        
        const {userId} = req.params



        if(!userId){
           return res.status(400).json({
                success: false,
                message: 'userId is mandatory'
            })
        }




        const cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select: 'title image price salePrice'
        })
        

        if(!cart){
            return res.status(200).json({
                success: false,
                message: 'No Cart Items'
            })
        }
        
        const validItems = cart.items.filter((item) => item.productId)

        if(validItems && validItems.length < cart.items.length){
            cart.items = validItems
        }

        const populatedItems = validItems.map((item) => 

           { return {
                productId: item.productId._id ? item.productId._id : null,
                title: item.productId._id ? item.productId.title : null,
                image: item.productId._id ? item.productId.image : null,
                price: item.productId._id ? item.productId.price : null,
                salePrice: item.productId._id ? item.productId.salePrice : null,
                quantity: item.productId._id ? item.quantity : null,
            }}
               
        )

        await cart.save()

        return res.status(200).json({
            success: true , 
            data: {...cart._doc, items: populatedItems}
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error'+ error
        })
    }
}

const updateCartItemsQty = async(req, res) => {
    try {
        const {productId, userId, quantity} = req.body



        if(!productId || !userId || !quantity){
            res.status(400).json({
                success:false,
                message: 'All Feilds are required'
            })
        }     

        const cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select: 'title image price salePrice'
        })

        
        if(!cart){
            res.status(404).json({
                success: false,
                message: 'cart not found'
            })
        }


        const indexOfProductItem = cart.items.findIndex(item => item.productId._id.toString() === productId)


        if(indexOfProductItem > -1){
            cart.items[indexOfProductItem].quantity += quantity
            const product = await Product.findById(productId)
            if (product.totalStock === 0 && quantity === 1) {
                return res.status(200).json({
                    success: false,
                    message: 'Product is out of stock',
                });
            }
            product.totalStock -= quantity
            console.log('product stock ', product.totalStock)

            await product.save()
        }else{
            res.status(404).json({
                message: 'product not found ',
                success: false
            })
        }

        await cart.save()


        const populatedItems = cart.items.map((item) => {
            return {
                productId: item.productId._id ? item.productId._id : null,
                title: item.productId._id ? item.productId.title : null,
                image: item.productId._id ? item.productId.image : null,
                price: item.productId._id ? item.productId.price : null,
                salePrice: item.productId._id ? item.productId.salePrice : null,
                quantity: item.productId._id ? item.quantity : null,
            }
        })


        res.status(201).json({
            success: true, 
            data: {...cart._doc, items: populatedItems }
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: ' + error
        })
    }
}

const deleteCartItem = async(req, res) => {
    try {

        const {productId, userId} = req.params

        if(!productId || !userId){
            return res.status(400).json({
                success: false, 
                message: 'All fields are required '
            })
        }

        let cart = await Cart.findOne({userId}).populate({
            path: 'items.productId',
            select: 'title image price salePrice'
        })

        
        if(!cart){
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            })
        }

        const findProductIndex = cart.items.findIndex(productItem => productItem.productId._id.toString() === productId)
        const product = await Product.findById(productId)

        product.totalStock += cart.items[findProductIndex].quantity
        console.log('quantity', cart.items[findProductIndex].quantity)

        await product.save()




        if(findProductIndex > -1){
            cart.items = cart.items.filter((cartItem) => cartItem.productId._id.toString() !== productId)
            console.log('product stock ', product.totalStock)
        }



 
        const populatedItems = cart.items.map((item) => {
            return {
                productId: item.productId._id ? item.productId._id : null,
                title: item.productId._id ? item.productId.title : null,
                image: item.productId._id ? item.productId.image : null,
                price: item.productId._id ? item.productId.price : null,
                salePrice: item.productId._id ? item.productId.salePrice : null,
                quantity: item.productId._id ? item.quantity : null,
            }
        })

        await cart.save()




        res.status(200).json({
            success: true,
            data: {...cart._doc, items: populatedItems}
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: '+ error
        })
    }
}

module.exports = {addToCart, fetchAllCartItems, updateCartItemsQty, deleteCartItem}