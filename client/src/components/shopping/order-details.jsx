import { useDispatch, useSelector } from "react-redux"
import { DialogContent } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { useEffect } from "react"
import { getOrderDetails } from "@/store/order-slice"
import { Badge } from "../ui/badge"
import { DialogTitle } from "@radix-ui/react-dialog"

function ShoppingOrderDetails({orderDetails}) {

    const {cartItems} = useSelector(state => state.cart)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()


  return (
        <DialogContent>
        <DialogTitle className="hidden"></DialogTitle>
        <div className="my-6 mx-2 space-y-3 text-lg font-semibold">
                <div className="flex items-center justify-between  ">
                    <span>Order Id</span>
                    <span>{orderDetails?._id}</span>
                </div>
                <div className="flex items-center justify-between ">
                    <span>Order date</span>
                    <span>{orderDetails?.orderDate.split('T')[0]}</span>
                </div>
                <div className="flex items-center justify-between ">
                    <span>Price</span>
                    <span>${orderDetails?.totalAmount}</span>
                </div>
                <div className="flex items-center justify-between ">
                    <span>Status</span>
                    <Badge
                    className={`${orderDetails?.orderStatus === 'confirmed' ?
                    'bg-green-500' : 
                    orderDetails?.orderStatus === 'rejected' ? 
                    'bg-red-500' : 
                    'bg-black'}`}
                    >
                        {orderDetails?.orderStatus}
                    </Badge>
                </div>
            </div>
            <Separator/>
            <h2 className="text-lg font-semibold">Order Details</h2>
            {orderDetails?.cartItems.length > 0 && orderDetails?.cartItems.map((item) => (
                <div key = {item._id} className="flex items-center justify-between text-gray-700 font-serif">
                    <span>Name : {item.title} </span>
                    <span>Qty : {item.quantity} </span>
                    <span>Total: ${item.price}</span>
                </div>
            ))}
                
            <Separator/>
            <h2 className="text-lg font-semibold">Shipping Info</h2>
                <div className="flex flex-col gap-y-1 text-muted-foreground">
                    <label>{user.username}</label>
                    <label>{orderDetails?.addressInfo?.address}</label>
                    <label>{orderDetails?.addressInfo?.city}</label>
                    <label>{orderDetails?.addressInfo?.pincode}</label>
                    <label>{orderDetails?.addressInfo?.phone}</label>
                    <label>{orderDetails?.addressInfo?.notes}</label>
                </div>
        </DialogContent>
  )
}

export default ShoppingOrderDetails