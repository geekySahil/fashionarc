import ProductDetailsModal from "@/components/shopping/product-details"
import ShoppingProductTile from "@/components/shopping/product-tile"
import SearchProductsInput from "@/components/shopping/search-products"
import { toast } from "@/hooks/use-toast"
import { addToCart, fetchAllCartItems } from "@/store/cart-slice"
import { getProductDetails } from "@/store/shopping-slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

function SearchProducts() {

  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const {isLoading, searchedProductsList} = useSelector(state => state.searchProducts)
  const { productDetails } = useSelector(state => state.shopProduct)
  const [open, setOpen] = useState(false)
  const {user} = useSelector(state => state.auth)



  const handleShowProductDialog = (productId) => {
      dispatch(getProductDetails({productId}))
  }

  const handleAddToCart = (productId, totalStockOfProduct) => {

    if(totalStockOfProduct === 0) {
      toast({
        title: 'Out of Stock Now', 
        variant: 'destructive'
      })
    } 
    dispatch(addToCart({
      userId: user.id, 
      productId: productId, 
      quantity: 1
    })).then((data) => {
      if(data.payload.success){

        dispatch(fetchAllCartItems({userId: user.id}))
        toast({
          title: 'Added to cart successfully'
        })
      }
    })
  }

  useEffect(() => {
    if(productDetails) setOpen(true)
  }, [dispatch, productDetails])


  return (
    <div className="mx-4 my-8">
      <div>
        <SearchProductsInput search={search} setSearch={setSearch}/>
      </div>
      <div className="mx-4 my-20 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {
          searchedProductsList.length ? searchedProductsList.map((product) => (
            <div key={product._id}>
              <ShoppingProductTile
              product={product}
              handleShowProductDialog = {handleShowProductDialog}
              handleAddToCart = {handleAddToCart}
              />
            </div>
          )) : <h2 className="mx-2 font-semibold text-4xl text-muted-foreground w-screen">No results found </h2>
        }
      </div>
      <ProductDetailsModal
      open={open} 
      setOpen={setOpen} 
      productDetails={productDetails} 
      handleAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default SearchProducts