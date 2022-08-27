import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function MobileProductSection({products=[]}) {
  console.log("products: ", products)
  return (
    <div className='mt-8'>

      <div className='grid grid-cols-2 gap-2 px-2'>
        {
          products.map((product, index) => {
            return (
              <div key={index} className='col-span-1 p-2 bg-white'>
                <Link passHref  href={`/product/${product?.slug}`} >
                  <div>
                  <Image alt="image"  
                    src={product?.variant_stock_price[0]?.images[0]?.url}
                    // src="/product-images/product1.webp"
                    width="100%" 
                    height="100%" 
                    layout="responsive" 
                    objectFit="contain"
                    />
                  <h4 className='text-xs'>{product.product_name}</h4>
                  </div>
                </Link>
              </div>
              )
            })
          }
      </div>
    </div>
  )
}
