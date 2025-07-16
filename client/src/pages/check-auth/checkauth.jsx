import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'


const CheckAuth = ({user, isAuthenticated, children}) => {

    const location = useLocation();

    console.log('location.pathname', location.pathname)

    if(!isAuthenticated && location.pathname === '/'){
      return <Navigate to={'/auth/register'}/>
    }
    if(isAuthenticated && location.pathname === '/'){
      if(user.role === 'admin'){
        return <Navigate to={'/admin/dashboard'} />
    }else{
        return <Navigate to={'/shopping/home'} />
    }
    }

  if(!isAuthenticated && !(location.pathname.includes('/login')|| location.pathname.includes('/register'))){
    return <Navigate to={'/auth/register'}/>
  }
  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
    if(user.role === 'admin'){
        return <Navigate to={'/admin/dashboard'} />
    }else{
        return <Navigate to={'/shopping/home'} />
    }
  }
  if(isAuthenticated && user.role === 'admin' && location.pathname.includes('/shopping')){
    return <Navigate to = {'/admin/dashboard'}/>
  }
  if(isAuthenticated && user.role !== 'admin' && location.pathname.includes('/admin')){
    return <Navigate to = {'/unauth-page'}/>
  }

  return <>{children}</>

}

export default CheckAuth