import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs'
import accountPageImg from '../../assets/pexels-olly-1050244.jpg'
import {Card, CardContent, CardHeader } from '@/components/ui/card'
import ShoppingOrders from '@/components/shopping/orders'
import ShoppingAddress from '@/components/shopping/address'


function ShoppingAccount() {
  return (
    <div className='flex flex-col'>
      <div className='relative h-[350px] w-full'>
          <img
          src={accountPageImg}
          className='w-full h-full overflow-hidden object-cover'
          />
      </div>
      <div className='mt-8 mx-4 p-6 border-2 rounded-lg'>
        <div className=' '>
          <Tabs defaultValue="orders" className="w-full">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders/>
            </TabsContent>
            <TabsContent value="address">
              <ShoppingAddress/>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  )
}

export default ShoppingAccount