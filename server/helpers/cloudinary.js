const cloudinary = require('cloudinary').v2
const multer = require('multer')


cloudinary.config({
    cloud_name: 'dei4a4vk7',
    api_key: '871658969269457',
    api_secret: 'FGxEYI5qNNAJaNTGTHqjK3gE0nc'
})

const storage = new multer.memoryStorage()

const uploadImageUtil = async (dataURL) => {
        const result = await cloudinary.uploader.upload(dataURL, {
            resource_type: 'auto'
        })
        
        return result
   
}

const upload = multer({storage})

module.exports = {uploadImageUtil, upload} 
