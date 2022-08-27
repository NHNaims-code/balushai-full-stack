import React from 'react'
import Image from 'next/image'

export default function Banner() {
  return (
    <div className='mt-4'>
      <div className='w-full h-[62px] bg-cover bg-center bg-no-repeat' style={{backgroundImage: `url('/banner-images/home-banner1.webp')`}}>

      </div>
    </div>
  )
}
