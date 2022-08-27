import React from 'react'
import Image from 'next/image'

export default function User({data, setMessages}) {
  console.log(data)
  console.log("msg: ", data?.messages)
  return (
    <div onClick={() => setMessages(data?.messages)} className='flex items-center hover:shadow-sm transition-all duration-100 p-2 border-b hover:cursor-pointer'>
      <div className='flex-grow'>
        <div className='flex items-center'>
          <div className='h-[40px] w-[40px] bg-center bg-cover bg-no-repeat rounded-full overflow-hidden' style={{backgroundImage: `url('/images/default-user.png')`}}>
          </div>
          <div className='pl-4'>
            <h4 className='font-semibold'>{data?.vendor_id?.seller_account?.shop_name}</h4>
            <p>Hi there!</p>
          </div>
        </div>
      </div>
      <div>
        <i className="fa-solid fa-circle-dot text-green-400"></i>
      </div>
    </div>
  )
}
