const Product = require("../../models/admin/products-model")
const Order = require("../../models/shopping/order-model")
const Review = require("../../models/shopping/review-model")



const addReview  = async(req, res) => {

    const {productId, userId, reviewMessage, username, reviewRating} = req.body


    try {
        if(!productId || !userId || !reviewMessage || !username || !reviewRating){
            return res.status(404).json({
                message: 'All fields are mandatory',
                success: false 
            })
        }

        const isOrdered = await Order.findOne({
            userId, 
            'cartItems.productId': productId, 
            orderStatus: 'confirmed'
        }) 

        if(!isOrdered){
            return res.status(400).json({
                message: 'you need to buy the product to review it',
                success: false
            })
        }

        const existingReview = await Review.findOne({productId, userId})

        if(existingReview){
            return res.status(200).json({
                message: 'Your have already reviewed this product', 
                status: false 
            })
        }

        const newReview = new Review({
            productId,
            userId,
            reviewMessage,
            username,
            reviewRating
        })

        await newReview.save()


        const reviews = await Review.find({productId})
        const reviewsLength = reviews.length
        const averageRating = reviews.reduce((sum, review) => sum + review?.reviewRating , 0)/reviewsLength

        await Product.findByIdAndUpdate(productId, {averageRating}, {new: true})


        return res.status(201).json({
            success: true, 
            data: newReview
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Error: '+ error,
            success: false 
        })
    }
}


const getAllReviews = async(req, res) => {
    try {
        const {productId} = req.params

        if(!productId){
            return res.status(500).json({
                message: 'product id is required ',
                success: false 
            })
        }


        const reviewsList = await Review.find({productId}).sort({createdAt: -1})

        if(!reviewsList || reviewsList.length === 0 ) {
            return res.status(500).json({
                message: 'no reviews found ',
                success: false 
            })
        }

        return res.status(200).json({
            success : true, 
            data: reviewsList
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error: '+ error,
            success: false 
        })
    }
}

module.exports = {addReview, getAllReviews}