import Link from 'next/link'
import React from 'react'
import SuperDealsCard from './SuperDealsCard'

export default function SuperDealsSection() {
  return (
    <div className='container shadow-lg rounded-md mx-auto mb-4 bg-white p-4'>
      {/* Super Deals header */}
      <div className='border-b pb-4'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <h1 className='text-xl font-bold'>Super<span className='text-[#D23E41]'>Deals</span></h1>
            <p className='ml-4'>Top products. Incredible prices.</p>
          </div>
          <Link passHref  href='#'>View more</Link>
        </div>
      </div>
      {/* Super Deals Content */}
      <div className='grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 pt-4'> 
          <SuperDealsCard src="/product-images/product1.webp"/>
          <SuperDealsCard src="/product-images/product2.webp"/>
          <SuperDealsCard src="/product-images/product3.webp"/>
          <SuperDealsCard src="/product-images/product1.webp"/>
          <SuperDealsCard src="/product-images/product3.webp"/>
          <SuperDealsCard src="/product-images/product2.webp"/>
      </div>
    </div>
  )
}
