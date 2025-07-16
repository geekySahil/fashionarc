import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingSideBar from './sidebar'
import ShoppingHeader from './header'

function ShoppingLayout() {

  
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
        <ShoppingHeader/>
        <main className='flex flex-col w-full'>
            <Outlet />
        </main>
        
    </div>
  )
}

export default ShoppingLayout