import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import ShoppingOrderDetails from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getAllShoppingOrders, getOrderDetails, resetOrderDetails } from "@/store/order-slice"
import { Badge } from "../ui/badge"

function ShoppingOrders() {

  const [shoppingDetailsOpen, setShoppingDetailsOpen] = useState(false)
  const dispatch = useDispatch()
  const {orders, orderDetails} = useSelector(state => state.order)
  const {user} = useSelector(state => state.auth)



  useEffect(() => {
    dispatch(getAllShoppingOrders(user.id))
  },[dispatch])


  console.log('orders-details', orderDetails)


  return (
    <div className="w-full ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order Id</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead className='sr-only'>Order details </TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            return (
              <TableRow key={order._id}>
              <TableHead>{order._id}</TableHead>
              <TableHead>{order.orderDate.split('T')[0]}</TableHead>
              <TableHead>
                  <Badge
                  className={`${order?.orderStatus === 'confirmed' ?
                  'bg-green-500' : 
                  order?.orderStatus === 'rejected' ? 
                  'bg-red-500' : 
                  'bg-black'}`}
                  >
                      {order?.orderStatus}
                  </Badge>
              </TableHead>
              <TableHead>${order.totalAmount}</TableHead>
              <TableHead >
                <Dialog open={shoppingDetailsOpen} onOpenChange={() => {
                  setShoppingDetailsOpen(false)
                  dispatch(resetOrderDetails())
                }}>
                  <DialogTitle className="hidden"></DialogTitle>
                    <Button onClick = {() => {
                      setShoppingDetailsOpen(true)
                      dispatch(getOrderDetails(order._id))
                    }
                    }>
                        View Details
                    </Button>
                    <ShoppingOrderDetails orderDetails={orderDetails}/>
                </Dialog>
                
              </TableHead>
  
  
            </TableRow>
            )
          })}
         
         
        </TableBody>
      </Table>
      
    </div>
  )
}

export default ShoppingOrders