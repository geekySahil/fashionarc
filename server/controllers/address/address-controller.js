const Address = require('../../models/adress/adress-model.js')


const addAddress = async(req, res) => {
    try {

        const {userId, address, city, pincode, phone, notes} = req.body


        if(!userId || !address || !city || !pincode || !phone || !notes){
           return res.status(400).json({
                success: false,
                message: 'All Fields are required'
            })
        }


        const newAddress = new Address({
            userId, 
            address, 
            city, 
            pincode, 
            phone, 
            notes
        })



        if(!newAddress){
            return res.status(404).json({
                success: false,
                message: 'something went wrong while creating a new address'
            })
        }



        await newAddress.save()



        return res.status(201).json({
            success: true,
            data: newAddress
        })


        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: ' + error
        })
    }
}

const fetchAllAddresses = async(req, res) => {
    try {

        const {userId} = req.params


        if(!userId){
            return res.status(400).json({
                success: false,
                message: 'userId is required'
            })
        }


        const addressList = await Address.find({userId})



        if(!addressList || addressList.length === 0 ){
            return res.status(404).json({
                success: false,
                message: 'No Adress found'
            })
        }


        return res.status(200).json({
            success: true,
            data: addressList
        })


        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error: ' + error
        })
    }
}

const editAddress = async(req, res) => {
    try {

        const formData = req.body
        const {userId, addressId} = req.params

        if(!userId || !addressId){
           return res.status(400).json({
                success: false,
                message: 'userId or addressId is missing'
            })
        }

        const updatedAdress = await Address.findOneAndUpdate({_id: addressId, userId} , formData , {new: true})

        if(!updatedAdress) {
           return res.status(404).json({
                success: false,
                message: 'Something went wrong while editing adress'
            })
        }

        return res.status(201).json({
            success: true,
            data: updatedAdress
        })


        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error: ' + error
        })
    }
}



const deleteAddress = async(req, res) => {
    try {

        const {userId, addressId} = req.params

        if(!userId || !addressId){
            return res.status(400).json({
                success: false,
                message: 'userId or addressId is missing'
            })
        }


        const deleteRes = await Address.findOneAndDelete({userId , _id: addressId})


        if(!deleteRes) {
            return res.status(404).json({
                success: false,
                message: 'Something went wrong while deleting adress'
            })
        }

       return res.status(201).json({
            success: true,
            message: 'Address deleted successfully'
        })


        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error: ' + error
        })
    }
}

module.exports = {addAddress, fetchAllAddresses, editAddress, deleteAddress}
