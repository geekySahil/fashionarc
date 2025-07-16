import ProductFilter from '@/components/shopping/filter'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowDownUp, Dot } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { sortOptions } from '@/config/auth'
import { getAllFilteredProducts, getProductDetails } from '@/store/shopping-slice'
import ShoppingProductTile from '@/components/shopping/product-tile'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductDetailsModal from '@/components/shopping/product-details'
import { addToCart, fetchAllCartItems } from '@/store/cart-slice'
import { toast } from '@/hooks/use-toast'


function ShoppingListing() {

  const [sort, setSort] = useState('lowtohigh')
  const [filters, setFilters] = useState({})
  const dispatch = useDispatch()
  const { products, productDetails } = useSelector(state => state.shopProduct)
  const {user} = useSelector(state => state.auth)
  const {cartItems} = useSelector(state => state.cart)
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)


  // console.log('products ', products)

  function createSearchParamsHelper (filterParams){
    let queryParams = []
      for (const [key,value] of Object.entries(filterParams)) {
          if(Array.isArray(value) && value.length > 0){
            const paramValue = value.join(',')

            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
          }
      } 

      return queryParams.join('&')
  }
  
  const handleSort = (value) => {
    setSort(value)
  }

  const handleFilters = (sectionId, currentOption) => {

    let cpyFilters = {...filters}
    // console.log('----------', cpyFilters, '----------')

    if(Object.keys(cpyFilters).indexOf(sectionId) === -1){
      cpyFilters = {
        ...cpyFilters,
        [sectionId]:[currentOption]
      }
    }else{
      if(cpyFilters[sectionId].indexOf(currentOption) === -1){
        cpyFilters[sectionId].push(currentOption)
      }else{
        cpyFilters[sectionId].splice(cpyFilters[sectionId].indexOf(currentOption), 1)
      }
    }

    // console.log('----------', cpyFilters, '----------')
    setFilters(cpyFilters)
    // console.log(filters)

    sessionStorage.setItem('filters', JSON.stringify(cpyFilters))
    
  }

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
        dispatch(getAllFilteredProducts({filterParams: JSON.parse(sessionStorage.getItem('filters')), sortParams: 'lowtohigh'}))
        toast({
          title: 'Added to cart successfully'
        })
      }
    })
  }

  useEffect(() => {
    const storedFilterData = JSON.parse(sessionStorage.getItem('filters'))
    if(storedFilterData) {
      setFilters(JSON.parse(sessionStorage.getItem('filters')))

    }else{
      setFilters({})
    }
  },[searchParams])



  useEffect(() => {
    if(productDetails) setOpen(true)
  }, [dispatch, productDetails])  

  useEffect(() => {

    const createQueryString = createSearchParamsHelper(filters)
    setSearchParams(new URLSearchParams(createQueryString))
  }, [filters])


  useEffect(() => {
    if(filters !== null && sort !== null)
    dispatch(getAllFilteredProducts({filterParams: filters, sortParams: sort}))
  },[dispatch, filters, sort])




  return (
    <div className='grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className='bg-background shadow-sm rounded-lg '>
          <div className='flex justify-between items-center border-b px-4 py-3'>
            <h2 className='font-bold'>All Products</h2>
            <div className='flex items-center gap-x-4'>
                <h3 >{products?.length} Products</h3>
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline'>
                      <ArrowDownUp />
                      Sort By
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align = 'end' className = 'p-2 space-y-6 w-[150px]'>
                    <DropdownMenuRadioGroup value = {sort} onValueChange={handleSort} className = 'space-y-2'>
                      {sortOptions.map((option) => {
                        return (
                          <DropdownMenuRadioItem className = 'flex' key={option.id} value={option.id}>
                            {option.label}
                          </DropdownMenuRadioItem>
                        )
                      })}
                     </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-5'>
                {
                  products && products.length > 0 && products.map((product) => {
                    return (
                      <div key={product._id}>
                          <ShoppingProductTile 
                          product={product} 
                          handleShowProductDialog={handleShowProductDialog} 
                          handleAddToCart={handleAddToCart}
                          />
                      </div>
                    )
                  })
                }
          </div>
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

export default ShoppingListing