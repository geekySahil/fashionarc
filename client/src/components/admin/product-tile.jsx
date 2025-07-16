import { removeProduct } from "@/store/product-slice"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"

function AdminProductTile({
  product, 
  setEditProductId,
  setProductform,
  setAddProductSidebar,
  handleRemoveProduct
}) {

  // console.log(product, 'product')
  
  return (
    <Card>
      <div className="mx-auto max-w-sm w-full ">
        <div className="h-[300px] rounded-t-lg m-2 mb-2 overflow-hidden">
          <img
          src={product?.image}
          alt={product?.title}
          className="object-cover w-full h-full "
          />
        </div>
        <CardContent className=''>
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <div className="flex items-center gap-x-2 mt-1">
            <h3 className={`${product?.salePrice > 0 ? 'line-through': "font-semibold"}`}>${product?.price}</h3>
            <h3 className={`${product?.salePrice > 0 ? 'font-semibold': "hidden"}`}>${product?.salePrice}</h3>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
              <Button onClick = {() => {
                setEditProductId(product?._id)
                setAddProductSidebar(true)
                setProductform(product)
              }}>Edit</Button>
              <Button onClick = {() => handleRemoveProduct(product._id)}>Remove</Button>
        </CardFooter>
      </div>
    </Card>
    
  )
}

export default AdminProductTile