import CommonForm from "@/components/common/form"
import { loginFormController } from "@/config/auth"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/auth-slice"
import { toast } from "@/hooks/use-toast"

function AuthLogin() {
  const initailState = {
    email : '',
    password : ''
  }

  const [form, setForm] = useState(initailState)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(loginUser(form)).then((data) => {
      console.log('data', data)

      if(data?.payload.success){
        return toast({
          title: data.payload.message
        })
      }else{
        return toast({
          title: data.payload.message,
          variant : 'destructive'
        })
      }

      
    })
  }

  return (
    <div className="w-full h-full">
      <div className='text-center flex-col'>
            <h1 className='font-bold text-2xl pt-5 '>Login, to your account</h1>
            <div className="flex justify-center items-center mt-3 ">
              <p>Don't have an account?</p>
              <Link className = 'font-semibold text-blue-400 ml-2' to={'/auth/register'}>Sign Up</Link>
            </div>
      </div>
      <CommonForm 
      formController={loginFormController} 
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      buttonText={'Sign In'}
      />
    </div>
  )
}

export default AuthLogin