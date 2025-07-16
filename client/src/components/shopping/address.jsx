import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import AddressList from './address-list'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config/auth'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress, deleteAddress, editAddress, fetchAllAddresses } from '@/store/adress-slice'
import { toast } from '@/hooks/use-toast'

const initialFormState = {
    address: '',
    city: '',
    pincode: '', 
    phone: '', 
    notes: ''
}

function ShoppingAddress({selectedAddress, setSelectedAddress}) {

    const [addressForm , setAddressForm] = useState(initialFormState)
    const {user} = useSelector(state => state.auth)
    const {addressList} = useSelector((state) => state.address)
    const dispatch = useDispatch()
    const [currentEditId, setCurrentEditId] = useState(null)

    const isFormComplete = Object.keys(addressForm).map((key) => addressForm[key] !== "").every(item => item)


    function handleFormSubmit (e) {
        e.preventDefault()

        if(currentEditId === null && addressList.length >= 2){
            toast({
                title: 'You cannot have more than 2 addresses'
            })
            return
        }


        if(currentEditId !== null) {
            dispatch(editAddress({
                userId: user.id, 
                addressId: currentEditId, 
                formData: addressForm
            })).then((data) => {
                if(data.payload.success){
                    dispatch(fetchAllAddresses(user.id))
                    toast({
                        title: 'Address details updated successfully'
                    })
                    setCurrentEditId(null)
                    setAddressForm(initialFormState)
                }
                
            })
        }
        else{
            dispatch(addAddress({
                userId: user.id,
                ...addressForm
            })).then((data) => {
                console.log('new address', data)
                if(data?.payload?.success){
                    dispatch(fetchAllAddresses(user.id))
                    toast({
                        title: 'New Address Added'
                    })
                }
                setAddressForm(initialFormState)

            })
        }
       
    }

    function handleDeleteAddress (address) {
        dispatch(deleteAddress({userId: user.id, addressId : address._id})).then((data) => {
            if(data.payload.success){
                dispatch(fetchAllAddresses(user.id))
                toast({
                    title: 'Address removed successfully'
                })
            }
        })
    }

    useEffect(() => {
        dispatch(fetchAllAddresses(user.id))
    }, [])



  return (
    <div className=''>
        <AddressList 
        addressList = {addressList} 
        handleDeleteAddress={handleDeleteAddress} 
        setCurrentEditId={setCurrentEditId}
        setAddressForm={setAddressForm}
        setSelectedAddress= {setSelectedAddress}
        selectedAddress={selectedAddress}
        />
        <Card className=''>
            <CardHeader>
                <CardTitle>Add Address</CardTitle>
            </CardHeader>
                
            <CardContent>
              <CommonForm
              formController={addressFormControls}
              form={addressForm}
              setForm={setAddressForm}
              onSubmit={handleFormSubmit}
              buttonText={currentEditId ? 'Edit' :'Add'}
              isDisable={isFormComplete === false}
              />
            </CardContent>
            
        </Card>
    </div>
  )
}

export default ShoppingAddress