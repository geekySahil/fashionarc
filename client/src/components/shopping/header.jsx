import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import ShoppingSideBar from './sidebar'
import { AlignJustify, ShoppingBag, LogOut, Menu, ShoppingCart, SquareUser } from 'lucide-react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { menuElements, sortOptions } from '@/config/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'
import UserCartWrapper from '../cart/cart-wrapper'
import { fetchAllCartItems } from '@/store/cart-slice'
import { getAllFilteredProducts } from '@/store/shopping-slice'


function MenuItems () {

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()


  const handleFilters = (option) => {
    // console.log(option)
    sessionStorage.removeItem('filters')
    if(option.id !== 'home' && option.id !== 'products' && option.id !== 'search') {
      sessionStorage.setItem('filters', JSON.stringify({category: [option.id]}))
      location.pathname.includes('listing') ? setSearchParams(new URLSearchParams(`?category=${option.id}`)) : 
      navigate(option.path)
    }else{
      navigate(option.path)
    }

  }


  return(
    <div className='flex flex-col lg:flex-row lg:items-center gap-6'>
      {
        menuElements.map((option) => {
          return <label 
          onClick = {() => handleFilters(option)} 
          className = 'text-lg font-medium cursor-pointer' 
          key={option.id} 
          >
            {option.label}
          </label>
        })
      }
    </div>
  )
}

function HeaderRightContent({cartOpen, setCartOpen}){

  const  {user} = useSelector(state => state.auth)
  const {cartItems} =useSelector(state => state.cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // console.log('cart items ', cartItems)

  

  function handleLogout () {
    dispatch(logoutUser())
  }

  
  useEffect(() => {
    dispatch(fetchAllCartItems({userId: user.id}))
  }, [])

  useEffect(() => {

    if(cartOpen !== true){
      const filt = JSON.parse(sessionStorage.getItem('filters'))

    }
    dispatch(getAllFilteredProducts({filterParams: JSON.parse(sessionStorage.getItem('filters')), sortParams: 'lowtohigh'}))
  }, [cartOpen])


  return (
    <div className='lg:flex lg:items-center gap-3'>
      <Sheet open={cartOpen} onOpenChange={() => setCartOpen(!cartOpen)}>
        <Button onClick={()=> setCartOpen(true)} variant='outline' size='icon' className= 'relative'> 
          <ShoppingCart className='w-6 h-6 '/>
          <span className='sr-only'>Add user Cart</span>
          {cartItems?.length && <div className='flex items-center justify-center absolute z-10 right-0 top-[-3px] bg-gray-300 w-4 h-4 rounded-full'>
            {cartItems?.length}

          </div>}
        </Button>


        <UserCartWrapper setCartOpen={setCartOpen} cartItems={cartItems}/>

      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarFallback className = 'bg-black text-white text-xl font-bold'>
              {user ? user?.username[0]?.toUpperCase() : ''} 
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
              <Button variant='outline' size='icon ' onClick={() => navigate('/shopping/account')}>
                <SquareUser />
                <span className='font-semibold'>Account</span>
              </Button>
              
          </DropdownMenuItem>
          <DropdownMenuItem>
              <Button variant='outline' size='icon ' onClick={handleLogout}>
                <LogOut />
                <span className='font-semibold'>Logout</span>
              </Button>
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>

    </div>
  )
}

function ShoppingHeader() {


  const [openMenu, setOpenMenu] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)




  return (
    <header className='sticky z-10 top-0'>
      <div className='flex items-center justify-between p-4 border-b'>
        <Link to={'/shopping/home'} className='flex  gap-x-2 font-bold font-serif text-xl pt-2'>
          <ShoppingBag className='text-red-800' size={30} />
          <h2 className='font-bold font-mono  text-gray-800'>
            <span className='font-extrabold text-2xl text-blue-600'>``f</span>
            ashionarc
            <span className='font-extrabold text-2xl text-blue-600'>_</span>
          </h2>
        </Link>
        
        <Sheet open={openMenu} onOpenChange={() => setOpenMenu(!openMenu)}>
          <SheetTitle className='hidden'></SheetTitle>
          <SheetTrigger asChild>
            <Button onClick={() => setOpenMenu(true)} variant = 'outline' className='rounded-lg border-[1px] p-1 border-gray-400 lg:hidden'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent onClick = {()=> setOpenMenu(false)} side='left' className='w-full max-w-xs'>
            <MenuItems/>
            <HeaderRightContent cartOpen = {cartOpen} setCartOpen= {setCartOpen}/>
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block m-auto'>
          <MenuItems/>
        </div>
        <div className='hidden lg:block '>
          <HeaderRightContent cartOpen = {cartOpen} setCartOpen= {setCartOpen}/>
        </div>
        
      </div>
    </header>
  )
}

export default ShoppingHeader