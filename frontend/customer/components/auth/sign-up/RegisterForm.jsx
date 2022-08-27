import Link from 'next/link';
import React, { useState } from 'react'
import { signUp } from '../../../adapters/auth/signUp';
import { TryCatch } from '../../../utils';

export default function RegisterForm() {
  const [registerData, setRegisterData] = useState({})
  const [errMsg, setErrMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (event) => {
    const newData = registerData
    newData[event.target.name] = event.target.value;
    setRegisterData(newData)
  }

  const handleSignUp = async (data) => {
    const error = await TryCatch(async() => {
      const response = await signUp('customer/sign-up', data)
      if(response.data){
        setIsSuccess(true)
        console.log("data : ", data)
      }else {
        setIsSuccess(false)
        console.log('something went wrong')
      }
    })
    if(error){
      setErrMsg(error)
    }

    console.log("my err: ", error)
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
    setIsSuccess(false)
    setIsLoading(true)
    setErrMsg(null)
    console.log(registerData)
    await handleSignUp(registerData)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div>
        <div className={`${errMsg? 'block' : 'hidden'} flex justify-between items-start bg-red-100 py-4 border-l-8 border-red-400 px-4 rounded-md text-red-600 transition-all duration-300 shadow mb-2`}>
          <span>{errMsg}</span>
          <div onClick={() => setErrMsg(null)} className=' ml-2 hover:cursor-pointer hover:rotate-180 transition-all duration-300'>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
      </div>
      <div>
        <div className={`${isSuccess? 'block' : 'hidden'} flex justify-between bg-green-100 py-4 border-l-8 border-green-400 px-4 rounded-md text-green-600 transition-all duration-300 shadow mb-2`}>
          <span>
            Successfully Registerd
            <Link passHref href='/auth/sign-in'><span className='ml-4 underline font-bold hover:cursor-pointer'>Sign In</span></Link>
          </span>
          <span onClick={() => setIsSuccess(false)} className='hover:cursor-pointer hover:rotate-180 transition-all duration-200'>
            <i className="fa-solid fa-xmark ml-2"></i>
          </span>
        </div>
      </div>
      <input onChange={handleChange} name='name' type='text' placeholder='Name' className='border p-4 rounded-lg my-2 focus:border-[#D23E41]' required />
      <input onChange={handleChange} name='phone' type='tel' placeholder='Mobile Number' className='border p-4 rounded-lg my-2 focus:border-[#D23E41]' required />
      <input onChange={handleChange} name='email' type='email' placeholder='Email' className='border p-4 rounded-lg my-2' required />
      <input onChange={handleChange} name='password' type='password' placeholder='Password' className='border p-4 rounded-lg my-2' required />
      <input onChange={handleChange} name='confirmPassword' type='password' placeholder='Confirm Password' className='border p-4 rounded-lg my-2' required />
      <button className='bg-[#D23E41] text-white p-4 rounded-full my-2'>
        {
          isLoading?<i className="fa-solid fa-loader animate-spin"></i>
          :'Sign Up'
        }
      </button>
    </form>
  )
}
