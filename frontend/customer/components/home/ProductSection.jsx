import React from 'react'
import { useEffect, useState } from 'react';
import { AllProducts } from '../../adapters/product';
import { TryCatch } from '../../utils';
import ProductCard from './ProductCard'

export default function ProductSection({products=[]}) {

  return (
    <div className='container mx-auto mb-8 mt-8'>
      <div className='text-center p-4 border-b-2 mb-4'>
        <h1 className='text-2xl select-all'>Explore what you love</h1>
      </div>
      <div className='grid sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6'>
        {
          products.map((product, index) => (
            <ProductCard key={index} data={product}/>
          ))
        }
      </div>
    </div>
  )
}
