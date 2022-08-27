import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { cancelOrder, getCustomerAllOrders } from '../adapters/order'
import { getUserData } from '../adapters/user'
import { prevPath } from '../constants'

export default function Order() {
  const router = useRouter()
  const [allOrders, setAllOrders] = useState([])
  const [userData, setUserData] = useState(null)
  useEffect(()=> {
    const fetcher = async () => {
      try {
        const response = await getCustomerAllOrders()
        const userResponse = await getUserData()
        setAllOrders(response.data[0].orders)
        setUserData(userResponse?.data)
        console.log(response.data)
      } catch (error) {
        console.log(error.response)
        router.push('/auth/sign-in')
      }
    }
    fetcher()
  }, [])

  const handleCancelOrder =async(order_id, product_id) => {
    // try {
    //   await cancelOrder(order_id, product_id)
    //   location.href('/cart')
    // } catch (error) {
    //   console.log(error?.response?.err)
    // }
  }

  if(!allOrders){
    return<div className='border container mx-auto m-4 flex justify-center items-center p-32 bg-white'>No Orders</div>
  }
  return (
    <div className='container mx-auto p-4'>
      <div className=' p-4 rounded'>
        <h4 className='text-center text-xl border-b pb-2'>My Orders</h4>
        {/* Order Mapping */}
        <div>
          { allOrders?.map((order, index) => (
              <div key={index} className='transition-all duration-150 bg-white p-4 my-4 hover:shadow-md hover:cursor-pointer border border-transparent'>
                <div className='flex justify-between border-b pb-1'>
                  <div>
                    <span className='text-gray-400'>Order Date : </span> 
                    <span className='font-bold'>{new Date(order.createdAt).toDateString()}</span>
                  </div>
                  {/* <div>
                    {order?.payment_information?.status === "PAID" 
                      ? <span className='bg-green-100 border border-green px-4 py-1 text-green-600'>{order?.payment_information?.status}</span>
                      : <span className='bg-[#d23e41]/10 border border-[#d23e41] text-[#d23e41] px-4 py-1 rounded-t-lg'>{order?.payment_information?.status}</span>
                    }
                  </div> */}
                </div>
                {/* Items Mapping */}
                { order?.products?.map((product, index) => (
                  <div key={index} className='py-4'>
                    <div className='grid grid-cols-10 gap-3'>
                      <div className='flex col-span-10 sm:col-span-4'>
                        <div className='h-16 w-24 mr-4'>
                        <Image alt="image"  
                          src={product.image}
                          // src="https://res.cloudinary.com/ismail61/image/upload/v1650217191/balushai/product/2d6132a2-4caa-48c2-88f2-20acaaecbac0-e27-200w-5g-bulb-surveillance-camera-night-vision-full-color-automatic-human-tracking-zoom-indoor-security.jpg_q90.jpg__yjl8zz.webp"
                          width="100%" 
                          height="84" 
                          layout="responsive" 
                          objectFit="contain"
                        />
                        </div>
                        <div>
                          <h4 className='font-medium text-sm text-gray-600'>{product?.name}</h4>
                          <div className='flex sm:flex-col text-sm mt-2 text-gray-400'>
                            <div>Color: {product?.color}</div>
                            <div className='mx-8 sm:mx-0'>Size: {product?.size}</div>
                          </div>
                        </div>
                      </div>
                      <div className='col-span-3 sm:col-span-2'>
                        <div className='text-gray-500 text-sm font-medium text-center'>Each</div>
                        <div className='text-center mt-2 font-semibold text-sm'>৳ {parseInt(product?.price)?.toLocaleString()}</div>
                      </div>
                      <div className='col-span-4 sm:col-span-3 flex flex-col'>
                        <div className='text-gray-500 text-sm font-medium sm:mb-2 text-center'>Quantity</div>
                        <div className='text-center mt-2 font-semibold text-sm'>{parseInt(product?.quantity)?.toLocaleString()}</div>
                      </div>
                      <div className='col-span-3 sm:col-span-1 flex flex-col items-center'>                    
                        <div className='text-gray-500 text-sm font-medium '>Total</div>
                        <div className='text-md font-semibold mt-2 text-gray-600'>৳ {parseInt(parseInt(product?.quantity) * parseInt(product?.price))?.toLocaleString()}</div>
                        
                      </div>
                    </div>
                  </div>
                  ))
                }
                <div className='flex justify-between border-t'>
                  <div className='mt-1'>
                    <span className='text-gray-400 mr-1'>Grand Total :</span>
                    <span className='font-bold'>৳ {parseInt(order?.grand_total).toLocaleString()}</span>   
                  </div>
                  <div className='bg-[#d23e41] text-white px-4 py-2' onClick={() => handleCancelOrder(order._id, product._id)}>Cancel Order</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
