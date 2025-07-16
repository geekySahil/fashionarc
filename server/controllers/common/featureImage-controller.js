const Feature = require('../../models/common/featureImage-model.js')

const addFeatureImage = async (req, res) => {
    try {
        const {image} = req.body;

        console.log('img url ', image)
        
        const featuredImage = new Feature({
            image
        })

        await featuredImage.save()

        return res.status(201).json({
            success: true, 
            data: featuredImage
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error' + error,
            success: false
        })
    }
}

const getFeatureImages = async(req, res) => {
    try {
        const featureImages = await Feature.find({})

        res.status(200).json({
            success: true, 
            data: featureImages
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error' + error,
            success: false
        })
    }
}

const deleteFeatureImage = async (req, res ) => {
    try {
        const {imageId } = req.params
    
        const deletedImage = await Feature.findByIdAndDelete(imageId)
        
        res.status(200).json({
            success: true, 
            data: deletedImage
        })
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: 'Error '+ error
        })
    }
}

module.exports = {addFeatureImage, getFeatureImages, deleteFeatureImage}