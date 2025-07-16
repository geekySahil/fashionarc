import { Minus, Plus, Trash } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { deleteCartItem, updateCartItemsQty } from "@/store/cart-slice"
import { toast } from "@/hooks/use-toast"

function UserCartContent({cartItem, cartIndex}) {
  
  
  const {user} = useSelector(state => state.auth)
  const {products} = useSelector(state => state.shopProduct)
  const {isLoading} = useSelector(state => state.cart)
  const dispatch = useDispatch()


  const handleUpdateCartItemQuantity = (productId, typeOfAction) => {

    console.log(isLoading)

    // if()
    const quantity = typeOfAction === 'plus' ? 1 : -1
    if(cartItem.quantity === 1 && typeOfAction ==='minus'){
      console.log('cannot delete')
      dispatch(deleteCartItem({userId: user.id, productId}))
      return
    }
    dispatch(updateCartItemsQty({userId: user.id, productId, quantity })).then((data) => {
      if(!data.payload?.success){
        toast({
          title: data.payload?.message,
          variant: 'destructive'
        })
      }
    })
  }


  return (
    <div className="flex items-center mt-4">
        <img
        src={cartItem?.image}
        alt={cartItem?.title}
        className="w-20 h-20 object-cover rounded-lg overflow-hidden"
        />
      <div className="flex flex-1 items-center justify-between mx-3">
        <div className="">
          <h3 className="text-xl font-semibold">{cartItem?.title}</h3>
          <div className="flex items-center text-lg gap-x-[4px] mt-1 font-medium ">
              <span 
              className={`border rounded-sm  ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={async () => {
                if(!isLoading) await handleUpdateCartItemQuantity(cartItem.productId, 'minus')
              }}
              >
                <Minus size={18}/>
              </span>
              <span>{cartItem?.quantity < 10 ?  `0${cartItem?.quantity}` : `${cartItem.quantity}`}</span>
              <span 
              className={`border rounded-sm ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={async () => {
                console.log("clicked")
                if(!isLoading) await handleUpdateCartItemQuantity(cartItem.productId, 'plus')
              }}
              >
                <Plus size={18}/>
              </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="font-semibold">${((cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price)*(cartItem?.quantity)).toFixed(2)}</h3>
                  <Button onClick={() => {
  console.log('is loading ', isLoading)

                    if(!isLoading)
                      dispatch(deleteCartItem({userId: user.id, productId: cartItem.productId}))
                  }
                  } className=' cursor-pointer mt-1 bg-slate-100 w-9 h-9'
                  variant='outline' 
                  size='icon'
                  >
            <Trash size={20}/>
          </Button>
        </div>
        
      </div>

    </div>
  )
}

export default UserCartContent