import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SheetContent, SheetFooter, SheetHeader, SheetTitle } from "../ui/sheet"
import UserCartContent from "./cart-content"

function UserCartWrapper({cartItems,setCartOpen}) {

  const navigate = useNavigate()

  const totalOfAllItems = cartItems?.reduce((sum , item) => {
    sum += item.salePrice > 0 ? item.salePrice*item.quantity : item.price*item.quantity
    return sum

  }, 0)


  return (
    <SheetContent >
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      {
        cartItems && cartItems.length > 0 && cartItems.map((item, index) => 
          <div className="border-b py-1"  key={item.productId}>
            <UserCartContent cartItem={item} cartIndex={index}/>
          </div>
        )
      }
      <SheetFooter>
        <div className="w-full">
          <div className="flex items-center justify-between my-6 mx-1 font-semibold text-xl">
            <h3 className="">Total</h3>
            <h3 className="">${totalOfAllItems}</h3>
          </div>
          <Button 
          onClick = {() => {
            navigate('/shopping/checkout') 
            setCartOpen(false)
          }
          } 
          className="w-full">Check Out</Button>
        </div>
      </SheetFooter>
    </SheetContent>
  )
}

export default UserCartWrapper