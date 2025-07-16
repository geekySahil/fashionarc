import { useDispatch, useSelector } from "react-redux"
import { DialogContent } from "../ui/dialog"
import { Separator } from "../ui/separator"
import CommonForm from "../common/form"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { getAdminOrderDetails, getAllAdminOrders, updateOrderStatus } from "@/store/adminOrder-slice"
import { data } from "autoprefixer"
import { getOrderDetails } from "@/store/order-slice"
import { toast } from "@/hooks/use-toast"

const OrderStatusFormControl = [ {
    label: 'Status',
    name: 'orderStatus',
    componentType: 'select',
    options: [
        {id: 'pending', label: 'Pending'},
        {id: 'inprocess', label: 'In Process'},
        {id: 'inshipping', label: 'In Shipping'},
        {id: 'delivered', label: 'Delivered'},
        {id: 'rejected', label: 'Rejected'}
    ]
}]



const initailFormData = {
    orderStatus: ''
}


function AdminOrderDetails({adminOrderDetails}) {


    const [statusForm, setStatusForm] = useState(initailFormData)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // console.log('first', statusForm)

    

    const handleUpdateStatus = (e) => {
        e.preventDefault()
        // console.log('handle Update status')
        dispatch(updateOrderStatus({...statusForm, orderId: adminOrderDetails?._id})).then(data => {
            if(data?.payload.success){
                console.log('data', data)
                setStatusForm(initailFormData)
                dispatch(getAllAdminOrders())
                dispatch(getAdminOrderDetails(adminOrderDetails?._id))
                toast({
                    title: 'Order status updated successfully'
                })
            }else{
                setStatusForm(initailFormData)
            }
        })
    }

    const isFormComplete = Object.keys(statusForm).map(key => statusForm[key] !== '').every(item => item)

  return (
    <DialogContent className = ' max-h-[95vh] overflow-auto'>
    <div className="my-6 mx-2 space-y-3 text-lg font-semibold">
        <div className="flex items-center justify-between  ">
            <span>Order Id</span>
            <span>{adminOrderDetails?._id}</span>
        </div>
        <div className="flex items-center justify-between ">
            <span>Order date</span>
            <span>{adminOrderDetails?.orderDate.split('T')[0]}</span>
        </div>
        <div className="flex items-center justify-between ">
            <span>Price</span>
            <span>${adminOrderDetails?.totalAmount}</span>
        </div>
        <div className="flex items-center justify-between ">
            <span>Status</span>
            <Badge
            className={`${adminOrderDetails?.orderStatus === 'confirmed' ?
            'bg-green-500' : 
            adminOrderDetails?.orderStatus === 'rejected' ? 
            'bg-red-500' : 
            'bg-black text-white'}`}
            >
                {adminOrderDetails?.orderStatus}
            </Badge>
        </div>
    </div>
    <Separator/>
    <h2 className="text-lg font-semibold">Order Details</h2>
    {adminOrderDetails?.cartItems.length > 0 && adminOrderDetails?.cartItems.map((item) => (
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
            <label>{adminOrderDetails?.addressInfo?.address}</label>
            <label>{adminOrderDetails?.addressInfo?.city}</label>
            <label>{adminOrderDetails?.addressInfo?.pincode}</label>
            <label>{adminOrderDetails?.addressInfo?.phone}</label>
            <label>{adminOrderDetails?.addressInfo?.notes}</label>

            <CommonForm
            formController={OrderStatusFormControl}
            form={statusForm}
            setForm={setStatusForm}
            onSubmit={handleUpdateStatus}
            isDisable={isFormComplete === false}
            buttonText={'Update Order Status'}
            />
        </div>
</DialogContent>
  )
}

export default AdminOrderDetails

            