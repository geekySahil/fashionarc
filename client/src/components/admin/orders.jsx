import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import AdminOrderDetails from "./order-details"
import { useDispatch, useSelector } from "react-redux"
import { getAdminOrderDetails, getAllAdminOrders } from "@/store/adminOrder-slice"
import { Badge } from "../ui/badge"
import { resetOrderDetails } from "@/store/adminOrder-slice"

function AdminOrdersList() {

  const [shoppingDetailsOpen, setShoppingDetailsOpen] = useState(false)
  const {adminOrders, adminOrderDetails} = useSelector(state => state.adminOrder)
  const dispatch = useDispatch()

  console.log('DETAILS Orders', adminOrderDetails)

  useEffect(() => {
    dispatch(getAllAdminOrders())
  }, [dispatch])


  return (
    <div className="w-full">
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
          {adminOrders.map((order) => {
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
                      dispatch(getAdminOrderDetails(order._id))
                    }
                    }>
                        View Details
                    </Button>
                    <AdminOrderDetails adminOrderDetails={adminOrderDetails}/>
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

export default AdminOrdersList