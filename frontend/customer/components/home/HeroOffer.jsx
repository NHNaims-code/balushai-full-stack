import React from 'react'
import OfferSlider from './HeroOfferSlider'

export default function TopOffer() {
  return (
    <div className='rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 mt-10'>
      <div className='grid grid-cols-3 gap-4'>
        <div className=' p-4'>
          <h4 className='text-xl font-semibold text-white'>Welcome newcommers!</h4>
          <p className='mt-4 text-white'>Get items for $1 or get a $5 copon!</p>
        </div>
        <div className=' col-span-2'>
          <OfferSlider/>
        </div>
      </div>
    </div>
  )
}
