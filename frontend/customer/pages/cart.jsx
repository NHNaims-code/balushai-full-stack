import next from 'next'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { updateCartItemQuantity, removeItem } from '../redux/cart/cartActions'
import SelectOption from '../components/common/SelectOption'
import { useRouter } from 'next/router'
import { deleteCartItem, getCustomerCart } from '../adapters/cart'

export default function Cart() {
  const dispatch = useDispatch()
  const router = useRouter()

  const [totalAmount, setTotalAmount] = useState(0)
  const [cart, setCart] = useState(null)

  useEffect(() => {
    const fetcher = async() => {
      try {
      const cartResponse = await getCustomerCart()
      setCart(cartResponse?.data)
      console.log(cartResponse?.data)
      let temp_price = 0;
      cartResponse?.data?.items?.map(item => {
        temp_price += (item?.special_price * item?.quantity)
      })
      setTotalAmount(temp_price)
      } catch (error) {
      
      }
    }
    fetcher()
  }, [])

  const quantityOptions = [
    {key: 1, value: 1},
    {key: 2, value: 2},
    {key: 3, value: 3},
    {key: 4, value: 4},
    {key: 5, value: 5}
  ]

  const handleRemoveItem = async(item) => {
    try {
      await deleteCartItem(item)
      location.href = '/cart'
    } catch (error) {
      
    }
    
  }

  if(cart){
      return (
        <div className='container mx-auto p-2 sm:p-4 mb-8 mt-[52px] sm:mt-0'>
          <div className='border-b mb-4 sm:mt-4 pb-4'>
            <p className='text-center text-xl sm:text-2xl font-bold'><i className="fa-regular fa-bag-shopping"></i> My Cart</p>
          </div>
          {
            !cart&&<div className='bg-white text-center p-16 rounded'>Empty Cart</div>
          }
          {cart&&<div className='grid grid-cols-10 gap-8'>
            {/* Cart Details */}
            <div className='col-span-10 xl:col-span-6'>
              <div className='bg-white p-4 rounded'>
                {
                  cart?.items?.map((product, index) => (
                    <div key={index} className='py-4'>
                      <div className='grid grid-cols-10 gap-3'>
                        <div className='flex col-span-10 sm:col-span-4'>
                          <div className='h-16 w-24 mr-4'>
                          <Image alt="image"  
                            src={product.image}
                            // src="https://res.cloudinary.com/ismail61/image/upload/v1650217191/balushai/product/2d6132a2-4caa-48c2-88f2-20acaaecbac0-e27-200w-5g-bulb-surveillance-camera-night-vision-full-color-automatic-human-tracking-zoom-indoor-security.jpg_q90.jpg__yjl8zz.webp"
                            width="84" 
                            height="84" 
                            layout="responsive" 
                            objectFit="contain"
                          />
                          </div>
                          <div>
                            <h4 className='font-medium text-sm text-gray-600'><Link href={`/product/${product?.product_id?.slug}`}>{product?.product_id?.product_name}</Link></h4>
                            <div className='flex sm:flex-col text-sm mt-2 text-gray-400'>
                              <div>Color: {product?.color_family}</div>
                              <div className='mx-8 sm:mx-0'>Size: {product?.size}</div>
                              <span onClick={() => handleRemoveItem(product)} className='text-[#d23e41] sm:mt-2 hover:cursor-pointer'>Delete</span>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-3 sm:col-span-2'>
                          <div className='text-gray-500 text-sm font-medium text-center'>Each</div>
                          <div className='text-center mt-2 font-semibold text-sm'>৳ {parseInt(product?.special_price)?.toLocaleString()}</div>
                        </div>
                        <div className='col-span-4 sm:col-span-3 flex flex-col'>
                          <div className='text-gray-500 text-sm font-medium sm:mb-2 text-center sm:text-left'>Quantity</div>
                          <SelectOption className="" onChange={(e) => updateCartItemQuantity(cart, product, e.target.value, dispatch)} options={quantityOptions} selected={product.quantity}/>
                        </div>
                        <div className='col-span-3 sm:col-span-1 flex flex-col items-center'>                    
                          <div className='text-gray-500 text-sm font-medium '>Total</div>
                          <div className='text-md font-semibold mt-2 text-gray-600'>৳ {parseInt(parseInt(product?.quantity) * parseInt(product?.special_price))?.toLocaleString()}</div>
                          
                        </div>
                      </div>
                    </div>
                  ))
                }
                {
                  cart?.items?.length == 0 
                  && <div className='my-24 flex justify-center items-center'>Empty Cart</div>
                }
              <div className='border-t pt-2 flex justify-between font-semibold'>
                <div>{cart?.items?.length} items</div>
                <div className='text-xl'>৳  {parseInt(totalAmount)?.toLocaleString()}</div>
              </div>
              </div>
            </div>
            {/* Checkout Details */}
            <div className='col-span-10 xl:col-span-4  bg-white rounded p-4'>
              <p className='text-gray-500 mb-1'>ENTER PROMO CODE</p>
              <div className='flex'>
                <input className='border p-2 flex-grow' type="text"/>
                <button className='bg-[#D23E41] text-white p-2 sm:px-16'>SUBMIT</button>
              </div>
              <div className='mt-8 text-gray-400'>
                <div className='flex justify-between mt-4'>
                  <span>Shipping cost</span>
                  <span>৳ 0</span>
                </div>
                <div className='flex justify-between mt-4'>
                  <span>Discount</span>
                  <span>৳ 0</span>
                </div>
                <div className='flex justify-between mt-4'>
                  <span>Tax</span>
                  <span>৳ 0</span>
                </div>
                <div className='flex justify-between mt-4 text-gray-700 font-semibold'>
                  <span>Estemeted Total</span>
                  <span>৳ {totalAmount?.toLocaleString()}</span>
                </div>
              </div>
            {cart?.items?.length !== 0 && <Link passHref href='/checkout'><div className='bg-[#D23E41] mt-8 text-white py-2 hover:shadow-lg text-center hover:cursor-pointer transition-all duration-150 rounded'><i className="fa-solid fa-lock"></i> CheckOut</div></Link>}
              
            </div>
          </div>}
        </div>
      )
    }else{
      return<div className='border container mx-auto m-4 flex justify-center items-center p-32 bg-white'>Empty Cart</div>
    }
  }

  
