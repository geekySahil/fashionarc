import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

function AdminHeader({open, setOpen, handleLogout}) {

  
  return (
    <div className='flex items-center lg:justify-end justify-between text-gray-100 px-4 py-3 border-b'>
      <Button onClick={() => setOpen(!open)} className=' lg:hidden sm:block text-2xl'>
        <AlignJustify />
      </Button>
      <Button onClick={handleLogout} 
      className = 'flex items-center gap-2'
      >
        <LogOut/>
        <p>Logout</p>
      </Button>
    </div>
  )
}

export default AdminHeader