import { Route, Router, Routes } from "react-router-dom"
import AuthRegister from "./pages/auth/register"
import AuthLogin from "./pages/auth/login"
import AuthLayout from "./components/auth/layout"
import AdminLayout from "./components/admin/layout"
import AdminDashboard from "./pages/admin/dashboard"
import AdminFeatures from "./pages/admin/features"
import AdminOrders from "./pages/admin/orders"
import AdminProducts from "./pages/admin/products"
import ShoppingLayout from "./components/shopping/layout"
import ShoppingHome from "./pages/shopping/home"
import ShoppingListing from "./pages/shopping/listing"
import ShoppingAccount from "./pages/shopping/account"
import ShoppingCheckout from "./pages/shopping/checkout"
import NotFound from "./pages/not-found/notfound"
import CheckAuth from "./pages/check-auth/checkauth"
import UnAuthPage from "./pages/not-found/unauthpage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Progress } from "@/components/ui/progress"
import PaypalReturn from "./pages/shopping/paypal-return"
import PaymentSuccessfull from "./pages/shopping/payment-success"
import ShoppingProducts from "./pages/shopping/products"
import SearchProducts from "./pages/shopping/search"



function App() {

  const {isAuthenticated, user, loading} = useSelector(state => state.auth)

  const dispatch = useDispatch()


  useEffect(()=> {
    dispatch(checkAuth())
   
  },[dispatch])

  if(loading) return <div className="h-screen w-screen flex items-center justify-center bg-primary-foreground"><h1 className="text-2xl">loading...</h1></div>



  return (
    <div className="flex-col min-w-screen overflow-hidden ">
      {/* header component */}
      {/* <h1 className='text-blue-600'>Header</h1> */}
      <Routes>

        <Route path='/' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>
        }>
        </Route>

        <Route path='/auth' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin/>}/>
          <Route path="register" element={<AuthRegister/>}/>
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="products" element={<AdminProducts/>}/>
        </Route>
        <Route path='/shopping' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout/>
            </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShoppingListing/>}/>
          <Route path="account" element={<ShoppingAccount/>}/>
          <Route path="checkout" element={<ShoppingCheckout/>}/>
          <Route path="paypal-return" element={<PaypalReturn/>}/>
          <Route path="payment-success" element={<PaymentSuccessfull/>}/>
          <Route path="products" element={<ShoppingProducts/>}/>
          <Route path="search" element={<SearchProducts/>}/>

        </Route>
        <Route path="*" element={<NotFound/>}/>
        <Route path='unauth-page' element={<UnAuthPage/>}/>
      </Routes>

    </div>
  )
}

export default App
