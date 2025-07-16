import React, { useEffect, useState } from 'react'
import { Baby, Bird, Bitcoin, Cat, ChevronLeft, ChevronRight, Cuboid, Fence, Footprints, Glasses, Shapes, Shirt, ShoppingBag, Watch } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductTile from '@/components/shopping/product-tile'
import { getAllFilteredProducts, getProductDetails } from '@/store/shopping-slice'
import ProductDetailsModal from '@/components/shopping/product-details'
import { Button } from '@/components/ui/button'
import { use } from 'react'
import { addToCart, fetchAllCartItems } from '@/store/cart-slice'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'
import { getFeatureImages } from '@/store/common-slice'


const categoryWithIcons =  [
  {id: 'men', label: 'Men', icon: Shirt},
  {id: 'women', label: 'Women', icon: ShoppingBag},
  {id: 'kids', label: 'Kids', icon: Baby},
  {id: 'accessories', label: 'Accessories',icon:  Watch},
  {id: 'footwear', label: 'Footwear',icon: Footprints},

]

const brandWithIcons = [
  {id: 'cr7', label: 'CR7', icon: Glasses},
  {id: 'puma', label: 'Puma', icon: Cat},
  {id: 'adidas', label: 'Adidas', icon: Shapes},
  {id: 'h&m', label: 'H&M', icon: Bitcoin},
  {id: 'HRX', label: 'HRX', icon: Cuboid},
  {id: 'campus', label: 'Campus',icon: Bird}

]

// const slides = [slide1, slide2, slide3]

function ShoppingHome() {

  

    const {products, productDetails} = useSelector(state => state.shopProduct)
    const {featuredImagesList} = useSelector(state => state.feature)
    const {user} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

  
    


    // console.log('current slide ', currentSlide)



    // console.log(productDetails, 'product detail s')


    useEffect(() => {
      dispatch(getAllFilteredProducts({filterParams: {}, sortParams: 'lowtohigh'}))
    }, [])

    
    useEffect(() => {
      if(productDetails) setOpen(true)
    }, [dispatch, productDetails])

    
    
    useEffect(() => {
      dispatch(getFeatureImages())
    }, [])

    // console.log(featuredImagesList.length)

    useEffect(() => {
      if(featuredImagesList && featuredImagesList.length > 0)  {
        const timer = setInterval(() => {
          setCurrentSlide(prev => (prev + 1) % featuredImagesList.length)
        }, 4000);
  
        return () => clearInterval(timer)
      }
      
    }, [featuredImagesList])


    
    const handleShowProductDialog = (productId) => {
      dispatch(getProductDetails({productId}))
    }



    const handleAddToCart = (productId) => {
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

    const handleFilters = (filter, section) => {
      sessionStorage.removeItem('filters')
      sessionStorage.setItem('filters', JSON.stringify({[section]: [filter]}) )
      navigate('/shopping/listing')
    }
    



  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <div className='relative overflow-hidden w-full max-sm:h-[270px] h-[550px] '>
        <div className='absolute right-14 w-[420px] top-8 z-20'>
          <h2 className='text-5xl text-white font-bold font-serif'>Bold fashion for every modern soul."</h2>
        </div>
      {featuredImagesList?.length > 0  && featuredImagesList.map((featuredImage, index) => (
        <img
          src={featuredImage.image}
          key={index}
          className={`w-full h-full absolute object-cover transition-transform ease-in-out duration-500 ${
            index === currentSlide
            ? 'transform translate-x-0'
            : 'transform translate-x-full'
        }`}
        />
      ))}
        <Button onClick = {() => setCurrentSlide((prev) => (prev - 1 + featuredImagesList.length)%featuredImagesList.length)} variant='outline' size='icon' className='absolute top-1/2 left-2'>
            <ChevronLeft className='w-14 h-14'/>
          </Button>
          <Button onClick = {() => setCurrentSlide((prev) => (prev + 1)%featuredImagesList.length)}  variant='outline' size = 'icon' className='absolute top-1/2 right-2'>
            <ChevronRight className='w-14 h-14'/>
        </Button>
      </div>
      
      

      <section className='flex flex-col items-center my-8 w-full'>
        <div>
          <h3 className='text-5xl font-semibold'>Shop By Category</h3>
        </div>
        <div className='grid grid-cols-3 justify-center lg:grid-cols-5 my-8 gap-x-4'>
        {
          categoryWithIcons.map((categoryItem) => {
            return (
              <div onClick = {() => handleFilters(categoryItem.id, 'category')} key={categoryItem.id} className='flex items-center justify-center'>
                <Card className='p-8' >
                    <categoryItem.icon size={70}/>
                </Card>
              </div>
            )
          })
        }
        </div>
      </section>

      <section className='flex flex-col items-center my-8 w-full'>
        <div>
          <h3 className='text-5xl font-semibold'>Shop By Brand</h3>
        </div>
        <div className='grid grid-cols-3 justify-center lg:grid-cols-6 my-8 gap-x-4'>
        {
          brandWithIcons.map((brandItem) => {
            return (
              <div onClick={() => handleFilters(brandItem.id, 'brand')} key={brandItem.id} className='flex items-center justify-center'>
                <Card className='p-8' >
                    <brandItem.icon size={70}/>
                </Card>
              </div>
            )
          })
        }
        </div>
      </section>
      <section>
        <div className='flex flex-col items-center my-8 w-full'>
          <h3 className='text-5xl font-semibold'>Featured Products </h3>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 my-8 gap-x-4'>
          {
            products?.length > 0 && products.map((item) => {
              return(
                <ShoppingProductTile key={item._id} product={item} handleAddToCart={handleAddToCart} handleShowProductDialog={handleShowProductDialog}/>
              )
            })
          }
        </div>
      </section>
      <ProductDetailsModal productDetails={productDetails} open={open} setOpen={setOpen}/>
    </div>
  )
}

export default ShoppingHome