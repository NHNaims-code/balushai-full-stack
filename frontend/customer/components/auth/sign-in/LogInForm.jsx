import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import { signIn } from '../../../adapters/auth/signin'
import { TryCatch } from '../../../utils'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../../redux'
import { getUserData } from '../../../adapters/user'
import { Authorization } from '../../../constants'
import { useRouter } from 'next/router'
import { updateCart } from '../../../redux/cart/cartActions'
import Link from 'next/link'

export default function LogInForm() {
  const [loginData, setLoginData] = useState({})
  const [errMsg, setErrMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(true)

  const dispatch = useDispatch()
  const router = useRouter()

  console.log(router)

  const handleChange = (event) => {
    const newData = loginData
    newData[event.target.name] = event.target.value;
    setLoginData(newData)
  }

  const handleSignIn = async (data) => {
    const error = await TryCatch(async() => {
      const response = await signIn('customer/sign-in', data)
      Cookies.set('token', response?.data?.token)
      console.log("data: ", response?.data)
      dispatch(setUserData(response?.data?.userData))
      dispatch(updateCart(response?.data?.userCart))
      
      location.href = '/'
    })
    if(!error){
      setIsLoading(false)
    }else{
      setErrMsg(error)
      setIsLoading(false)
    }
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    setIsSuccess(false)
    setIsLoading(true)
    setErrMsg(null)
    await handleSignIn(loginData)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div>
        <div className={`${errMsg? 'block' : 'hidden'} flex justify-between items-start bg-red-100 py-4 border-l-8 border-red-400 px-4 rounded-md text-red-600 transition-all duration-300 shadow mb-2`}>
          <span>{errMsg} <Link href='/auth/sign-up' ><span className='ml-2 hover:cursor-pointer text-green-400 font-semibold underline'>Sign Up</span></Link></span>
          <div onClick={() => setErrMsg(null)} className=' ml-2 hover:cursor-pointer hover:rotate-180 transition-all duration-300'>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
      <input onChange={handleChange} name='email' type='text' placeholder='Email' className='border p-4 rounded-lg my-2' required/>
      <input onChange={handleChange} name='password' type='password' placeholder='Password' className='border p-4 rounded-lg my-2' required/>
      <button className='bg-[#D23E41] text-white p-4 rounded-full my-2'>
        {
          isLoading?<i className="fa-solid fa-loader animate-spin"></i>
          :'Sign In'
        }
      </button>
    </form>
  )
}
