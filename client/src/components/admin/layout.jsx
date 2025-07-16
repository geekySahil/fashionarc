import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'
import AdminHeader from './header'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'

function AdminLayout() {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  function handleLogout (){
    dispatch(logoutUser()).then(data => {
      if(data.payload.success){
        console.log(data)
      }
    })
  }
  return (
    <div className='flex min-h-screen w-full'>
        <AdminSidebar open = {open} setOpen={setOpen} handleLogout={handleLogout}/>
        <div className='flex flex-1 flex-col'>
            <AdminHeader open = {open} setOpen={setOpen} handleLogout={handleLogout}/>
            <main className='flex flex-1 bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>
            
        </div>
    </div>
  )
}

export default AdminLayout