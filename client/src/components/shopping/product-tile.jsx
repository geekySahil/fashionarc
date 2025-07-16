import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { addToCart } from "@/store/cart-slice"
import { Badge } from "../ui/badge"
import StarRating from "./star-rating"

function ShoppingProductTile({product, handleShowProductDialog, handleAddToCart}) {

  return (
    <Card>
        <div className="p-2" onClick={() => {handleShowProductDialog(product._id)}}>
            <div className="h-60 relative" >
                <img
                src={product.image}
                alt={product.title}
                className="object-cover h-full w-full rounded-t-lg overflow-hidden"
                />
                 {
                product.salePrice > 0 && 
                <Badge className="absolute z-10 top-2 left-2 bg-red-500 text-[12px] font-semibold hover:bg-red-600 rounded-xl text-white">
                    sale
                </Badge>
                
                }
                {
                    product.totalStock > 0 && product.totalStock < 20 ?
                    <Badge className={`absolute z-20 top-2 left-2 text-[12px] bg-orange-400 hover:bg-orange-700`}>
                        {`Only ${product.totalStock} items left`}
                    </Badge> : product.totalStock === 0 && 
                    <Badge className={`absolute z-20 top-2 left-2 text-[12px] bg-gray-400 hover:bg-gray-700`}>
                        Out of Stock
                    </Badge>
                }
            </div>
           
            <CardContent>
                <h1 className="font-semibold mt-2 text-xl font-sans">{product.title}</h1>
                <StarRating rating={product?.averageRating} iconSize={'w-4 h-4'}/>
                <div className="flex items-center justify-between my-2 font-serif">
                    <h3>{product.category}</h3>
                    <h3>{product.brand}</h3>
                </div>
                <div className="flex items-center gap-x-2">
                    <h3 className={`${product.salePrice > 0 ? 'line-through' : 'font-semibold'}`}>${product.price}</h3>
                    <h3 className={`${product.salePrice > 0 ? 'font-semibold' : 'hidden'}`}>${product.salePrice}</h3>
                </div>
               
            </CardContent>
            
            
        </div>
        <CardFooter>
            <Button disabled= {product.totalStock === 0} onClick={() => handleAddToCart(product._id, product.totalStock)} className="w-full">Add to Cart</Button>
        </CardFooter>
    </Card>
  )
}

export default ShoppingProductTile