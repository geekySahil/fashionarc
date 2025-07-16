const Router = require('express')
const { upload } = require('../../helpers/cloudinary')
const { handleProductImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct } = require('../../controllers/admin/products-controller')

const router = Router()

router.post('/upload-image', upload.single('my_file') , handleProductImageUpload)
router.post('/add' , addProduct)
router.get('/get', fetchAllProducts)
router.put('/edit/:id',  editProduct)
router.delete('/delete/:id', deleteProduct)


module.exports = router