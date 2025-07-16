import CommonForm from '@/components/common/form'
import { registerFormController } from '@/config/auth'
import { toast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'


function AuthRegister() {

  const initailState = {
    username: '',
    email: '',
    password: ''
  }

  const dispatch = useDispatch()
  const [form , setForm] = useState(initailState)
  const navigate = useNavigate()


  const onSubmit =  (e) => {
    e.preventDefault()

    dispatch(registerUser(form)).then((data) => {
      if (data?.payload.success) {
        console.log(data?.payload.message)
        toast({
          title: data?.payload.message
        })
        navigate('/auth/login')

      }else{
        toast({
          title: data.payload.message,
          variant: 'destructive'
        })
      }
    })
    
    // try {
    //   const data = await dispatch(registerUser(form))
    //   console.log('data', data)
    //   if(data?.payload.success){
    //     toast({
    //       title: data?.payload.message
    //     })
    //   }else{
    //     toast({
    //       title: data?.payload.data.message,
    //       variant: 'destructive'
    //     })
    //   }
    // } catch (error) {
    //   toast({
    //     title: data?.payload.message,
    //     variant: 'destructive'
    //   })
    // }

    // console.log('FORM SUBMITTED SUCCESSFULLY')

  }

  return (
    <div className='h-full w-full '>
      <div className='text-center '>
            <h1 className='font-bold text-2xl pt-5 '>Create a new account? </h1>
            <div className="flex justify-center items-center mt-3 ">
              <p>Already have an account?</p>
              <Link className = 'font-semibold text-blue-400 ml-2' to={'/auth/login'}>Log in</Link>
            </div>
        </div>
      
      <CommonForm 
      formController={registerFormController} 
      form={form} 
      setForm={setForm} 
      onSubmit={onSubmit} 
      buttonText={'Sign Up'}
      />
      </div>
  )
}

export default AuthRegister