import React from 'react'
import RegisterForm from '../../components/auth/sign-up/RegisterForm'

export default function signUp() {
  return (
    <div className='container mx-auto p-8 mt-[52px] sm:mt-0'>
      <div className='flex justify-center items-center'>
        <div className='bg-white p-4 shadow-lg w-full sm:w-[360px]'>
          <div>
            <h4 className='text-center text-xl font-semibold mb-4'>Register</h4>
          </div>
          <RegisterForm/>
          <div className='flex justify-between items-center my-4'>
            <span className='bg-gray-300 grow h-[1px]'></span>
            <p className='mx-2'>Or continue with</p>
            <span className='bg-gray-300 grow h-[1px]'></span>
          </div>
          <div>
            <div className='flex items-center border p-2 justify-center hover:cursor-pointer'>
              <i className="fa-brands text-blue-500 text-4xl fa-facebook"></i>
              <span className='ml-4'>Login with Facebook</span>
            </div>
            <div className='flex items-center border p-2 justify-center mt-4 hover:cursor-pointer'>
              <i className="fa-brands text-[#D23E41] text-4xl fa-google"></i>
              <span className='ml-4'>Login with Google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStaticProps(){
  
}