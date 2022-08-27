import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard({data}) {
  console.log("from product card: ", data)
  return (
    <Link passHref  href={`/product/${data?.slug}`}>
      <div className='transition-all duration-150 cursor-pointer rounded-md overflow-hidden shadow-md hover:shadow-lg'>
        <div className='bg-white'>
          <div>
            <Image alt="image"  
              src={data?.variant_stock_price[0]?.images[0]?.url}
              width="100%" 
              height="100%" 
              layout="responsive" 
              objectFit="contain"
              />
          </div>
          <div className='p-2'>
            <h4 className='text-sm h-6 whitespace-nowrap overflow-hidden text-ellipsis'>{data?.product_name}</h4>
            <div>
              BDT 
              <span className='text-sm ml-1'>
                ৳
                <span className='text-xl font-semibold'>
                {parseInt(data?.variant_stock_price[0]?.sizes[0]?.pricing?.special_price).toLocaleString()}
                </span>
              </span>
              <span className='ml-2'>
                ৳
                <span className='line-through'>
                {parseInt(data?.variant_stock_price[0]?.sizes[0]?.pricing?.price).toLocaleString()}
                </span>
              </span>
            </div>
            <div className='mt-1 text-sm'>
              <span className='text-md'>{data?.orders?.length} sold</span>
              <span><i className="fa-solid fa-star text-amber-500 mx-2"></i>{data?.rating}</span>
            </div>
            <div className='text-sm mt-1'>
              Free Shipping
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
