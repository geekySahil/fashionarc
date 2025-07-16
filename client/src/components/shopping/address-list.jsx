import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Button } from '../ui/button'

function AddressList({addressList, handleDeleteAddress, setCurrentEditId, setAddressForm, selectedAddress, setSelectedAddress}) {


  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3'>
        {
          addressList && addressList.length ? (
            
              addressList.map((address) => {
                return <Card key={address._id} 
                onClick = {() => addressList.length > 0 ? setSelectedAddress(address) : setSelectedAddress({})}
                className={`${selectedAddress === address ? 'border-2 border-black opacity-110' :''}`}
                >
                  <CardContent className={` p-8 space-y-2 text-lg font-semibold`}>
                      <div className='flex items-center justify-between'>
                          <span>Address: </span>
                          <span>{address.address}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                          <span>City: </span>
                          <span>{address.city}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                          <span>Pincode: </span>
                          <span>{address.pincode}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                          <span>Phone: </span>
                          <span>{address.phone}</span>
                      </div>
                      <div className='flex items-center justify-between'>
                          <span>Notes: </span>
                          <span>{address.notes}</span>
                      </div>
                  </CardContent>
                  <CardFooter className = 'px-8 flex items-center justify-between'>
                      <Button onClick = {() => {
                        setCurrentEditId(address._id)
                        setAddressForm(address)
                        }}>
                        Edit
                      </Button>
                      <Button onClick = {() => handleDeleteAddress(address)}>
                        Delete
                      </Button>
                  </CardFooter>
                </Card>
              })
            
          ) : null
        }
    </div>
  )
}

export default AddressList