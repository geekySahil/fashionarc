import ShoppingAddress from '@/components/shopping/address'
import accImg from '../../assets/pexels-olly-1050244.jpg'
import UserCartWrapper from '@/components/cart/cart-wrapper'
import UserCartContent from '@/components/cart/cart-content'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@/components/ui/button'
import { createOrder } from '@/store/order-slice'
import { useState } from 'react'
import { toast } from "@/hooks/use-toast"
import { Skeleton } from '@/components/ui/skeleton'

function ShoppingCheckout() {

  const [selectedAddress , setSelectedAddress] = useState({})
  const [isPaymentStarted, setIsPaymentStarted] = useState(false)
  const {cartItems, cartId} = useSelector(state => state.cart)
  const {user} = useSelector(state => state.auth)
  const {approvalURL, isLoading} = useSelector(state => state.order)
  const dispatch = useDispatch()




  const totalOfAllItems = cartItems?.reduce((sum, item) => {
    sum += item.salePrice > 0 ? item.salePrice * item.quantity : item.price * item.quantity
    return sum
  }, 0)



  const handleCheckOut = async() => {

    if(Object.keys(selectedAddress).length === 0){
      console.log('selectedaddress', selectedAddress)

      return toast({
        title: 'Address is missing, please provide an address.',
        variant: 'destructive'
      })
    }
  
    if(cartItems.length === 0){
      console.log('cart items ', cartItems)
      return toast({
        title: 'Your cart is empty, add products first .',
        variant: 'destructive'
      })
    }


    const orderDetails = {
      userId: user.id,
      cartId: cartId,
      cartItems: cartItems.length > 0 && cartItems.map((item) => {
        return {
          productId: item.productId,
          title: item.title,
          image: item.image,
          price: item.salePrice > 0 ? item.salePrice : item.price,
          quantity: item.quantity
        }
      }),
      addressInfo: {
        addressId: selectedAddress._id,
        address: selectedAddress.address,
        city: selectedAddress.city,
        phone: selectedAddress.phone,
        pincode : selectedAddress.pincode,
        notes: selectedAddress.notes
      }, 
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalOfAllItems,
      orderDate : new Date(),
      orderUpdateDate : new Date(),
      paymentId: '',
      payerId: ''
    } 

    // console.log('order data ', orderDetails)
    dispatch(createOrder(orderDetails)).then(data => {
      if(data?.payload.success) {
        // console.log('data', data)
        setIsPaymentStarted(true)
      }else{
        setIsPaymentStarted(false)
      }
    })
  }



  if(approvalURL){
    window.location.href = approvalURL
  }




  return (
    <div>
      <div className='w-full h-[300px]'>
        <img
        src={accImg}
        className='object-cover overflow-hidden h-full w-full'
        />
      </div>
      <div className='grid md:grid-cols-2 m-4 py-5 w-full '>
        <div className=' grid grid-cols-1'>
            <ShoppingAddress selectedAddress = {selectedAddress} setSelectedAddress={setSelectedAddress}/>
        </div>
        <div className='flex-1 mx-3 px-8 border-2 rounded-lg '>
          {
          cartItems && cartItems.length > 0 && cartItems.map((item) => 
            <div className="border-b py-1"  key={item.productId}>
              <UserCartContent cartItem={item}/>
            </div>
          )
          }
          <div className="w-full">
            <div className="flex items-center justify-between my-6 mx-1 font-semibold text-xl">
              <h3 className="">Total</h3>
              <h3 className="">${totalOfAllItems}</h3>
            </div>
            <Button 
            disabled={isPaymentStarted || isLoading}
            onClick = {() => {
              handleCheckOut()
            }
            } 
            className="w-full">
              {isLoading ? <p>Fetching...</p> : <p>Check Out with Paypal</p>}
            </Button>
          </div>
        </div>
      </div>
    </div>
    // {isLoading ? 'Loading...': 'Check Out with Paypal'}
  )
}

export default ShoppingCheckout