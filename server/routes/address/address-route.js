const express = require('express')
const { fetchAllAddresses, addAddress, editAddress, deleteAddress } = require('../../controllers/address/address-controller')

const router = express.Router()


router.post('/add', addAddress)
router.get('/get/:userId', fetchAllAddresses)
router.put('/edit/:userId/:addressId', editAddress)
router.delete('/delete/:userId/:addressId', deleteAddress)

module.exports = router