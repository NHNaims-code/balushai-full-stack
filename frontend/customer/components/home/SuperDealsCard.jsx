import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SuperDealsCard({src}) {
  return (
    <Link passHref  href='/product/id' className='no-underline'>
      <div className='cursor-pointer'>
        <div className='relative'>
          <Image alt="image"  
            src={src}
            width="100%" 
            height="100%" 
            layout="responsive" 
            objectFit="cover"
          />
          <div className='absolute top-0 left-0 shadow-sm bg-[#D23E41] p-1 text-white px-2 rounded-r'>82% off</div>
        </div>
        <div>
          <div className='px-1'> 
            <span className='text-[#D23E41]'>$<span className='text-4xl font-bold'>7</span> </span>
            <span className='ml-2 line-through'>US $41</span>
          </div>
          <p>15602 orders</p>
        </div>
      </div>
    </Link>
  )
}
