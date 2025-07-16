const { uploadImageUtil } = require('../../helpers/cloudinary.js')
const Product = require('../../models/admin/products-model.js')

const handleProductImageUpload = async (req, res) => {
    try {

        const b64 = Buffer.from(req.file.buffer).toString('base64') 
        const dataURL = 'data:' + req.file.mimetype + ';base64,' + b64 
        const result = await uploadImageUtil(dataURL)

        res.json({
            success: true,
            result
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}


const addProduct = async (req, res) => {
    try {
        const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        } = req.body
    
        const newlyCreatedProduct = new Product({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        })
    
     
        await newlyCreatedProduct.save()
    
        res.status(201).json({
            success: true , 
            data: newlyCreatedProduct
        })
    } catch (error) {
        res.status(500).json({
            message: 'Error occured while adding new product',
            success: false
        })
    }
}

const fetchAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find({})

        res.status(201).json({
            success: true, 
            data: allProducts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occured'
        })
    }
}

const editProduct = async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body;

        
        const productToEdit = await Product.findById(req.params.id)

    
        if(!productToEdit){
            console.log('failed')
            res.status(404).json({
                message: 'product not found ',
                success: false
            })
        }
    
        productToEdit.image =  image || productToEdit.image
        productToEdit.title =  title || productToEdit.title
        productToEdit.description =  description || productToEdit.description
        productToEdit.category =  category || productToEdit.category
        productToEdit.brand =  brand || productToEdit.brand
        productToEdit.price =  price || productToEdit.price
        productToEdit.salePrice =  salePrice || productToEdit.salePrice
        productToEdit.totalStock =  totalStock || productToEdit.totalStock

        await productToEdit.save()

    
        res.status(201).json({
            success: true,
            data: productToEdit
        })
    } catch (error) {
        console.log('failed 500')

        res.status(500).json({
            message:'error occrued', 
            success: false
        })
    }



}

const deleteProduct = async (req, res) => {

    try {
        const {id} = req.params
        const deletedProduct = await Product.deleteOne({_id: id})
    
        res.status(200).json({
            message: 'product deleted successfully',
            data: null,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: 'error occured',
            success: false
        })
    }
}

module.exports = {handleProductImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct}