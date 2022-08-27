import React from 'react'
import HeroCategory from './HeroCategory'
import HeroOffer from './HeroOffer'
import HeroRightSection from './HeroRightSection'
import HeroSlider from './HeroSlider'

export default function HeroSection() {
  return (
    <div className='container mx-auto'>
      <div className='grid xl:grid-cols-5 grid-cols-4 gap-4'>
        {/* Category sidebar */}
        <HeroCategory/>

        {/* Center contents */}
        <div className='col-span-3 mt-4 rounded-lg mb-4'>
          <HeroSlider/>
          <HeroOffer/>
        </div>

        {/* Right side section */}
        <HeroRightSection/>
      </div>
    </div>
  )
}
