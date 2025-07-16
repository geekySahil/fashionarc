import React, { Fragment } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ChartBarDecreasing, FileSliders, LayoutDashboard, Menu, PackageOpen, Truck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



const sideBarMenuItems = [
  {
    id:'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard />,
    path: '/admin/dashboard'
  },
  {
    id: 'products',
    label: 'Products',
    icon: <PackageOpen/>,
    path: '/admin/products'
  },
  {
    id:'orders',
    label: 'Orders',
    icon: <Truck />,
    path: '/admin/orders'
  },
]

function MenuItems({setOpen}){
  const navigate = useNavigate()

  return(
    <nav className='mt-2'>
      {
        sideBarMenuItems.map(item =>  (
          <div key = {item.id} onClick = {() => {
            navigate(item.path)

            setOpen(false)
          }} 
          className='flex items-center text-gray-600 py-2 cursor-pointer hover:bg-primary-foreground hover:text-black'>
            {item.icon}
            <h3 className='ml-3 font-semibold'>{item.label}</h3>
          </div>
        ))
      }
    </nav>
  )
}




function AdminSidebar({open, setOpen}) {



  return (
    <Fragment>
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetContent side = 'left' className= 'w-64'>
          <SheetHeader >
            <SheetTitle className = 'flex items-center gap-x-3'>
            <ChartBarDecreasing size={20} />
            <label htmlFor="sidebar">Admin SideBar</label>
            </SheetTitle>
          </SheetHeader>
          <MenuItems setOpen={setOpen}/>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 lg:flex flex-col border-r bg-background '>
          <div className=' ml-3'>
            <div className='flex items-center gap-x-3 py-3 my-3 font-bold text-lg'>
              <ChartBarDecreasing size={30} />
              <label htmlFor="sidebar">Admin SideBar</label>
            </div>
          <MenuItems setOpen={setOpen}/>
          
          </div>

      </aside>
    </Fragment>

  )
}

export default AdminSidebar