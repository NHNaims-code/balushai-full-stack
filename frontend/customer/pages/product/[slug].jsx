import React, { useEffect, useState } from 'react'
import { AllProducts, getSingleProduct, SingleProduct } from '../../adapters/product'
import { useRouter } from 'next/router'
import { addToCart, deleteCartItem, getCustomerCart } from '../../adapters/cart'
import Link from 'next/link'
import Image from 'next/image'
import HTMLReactParser from 'html-react-parser'
import { createCustomerConversation } from '../../adapters/chat/conversation'

export default function ProductDetail({product}) {
  const router = useRouter()

  const [cart, setCart] = useState([])
  const [onCart, setOnCart] = useState(false)
  const [currentSize, setCurrentSize] = useState(product?.variant_stock_price[0]?.sizes[0])
  const [currentVariant, setCurrentVariant] = useState(product?.variant_stock_price[0])
  const [quantity, setQuentity] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetcher = async () => {
      try {
        const cartResponse = await getCustomerCart()
        setCart(cartResponse?.data)
        checkExistOnCart(cartResponse?.data?.items)
        if(cartResponse?.data?.items?.length == 0){
          setOnCart(false)
        }
      } catch (error) {
        console.log('something went wrong! order-> 29')
      }
    }
    
    fetcher()
  }, [])

  const checkExistOnCart = async (items) => {
    console.log(items)
    if(items.length == 0){
      setOnCart(false)
    }
    items.map(item => {
      console.log(item.product_id?._id, "==", product?._id)
      if(item.product_id?._id == product?._id || item.product_id == product?._id){
        product?.variant_stock_price?.map(variant => {
          if(variant?.color_family === item.color_family){
            setCurrentVariant(variant)
            variant?.sizes?.map(size => {
              if(size?.size === item?.size){
                setOnCart(item)
                setCurrentSize(size)
              }
            })
          }
        })
        setQuentity(item.quantity)
      }else{
        console.log("not exist: ")
        setOnCart(false)
      }
    })
  }

 


  const handleAddToCart = async() => {
    console.log('hit')
    setLoading(true)
    try {
      const cartItem = {
        product_id: product?._id,
        vendor_id: product?.vendor_id,
        color_family: currentVariant?.color_family,
        size: currentSize?.size,
        price: currentSize?.pricing?.price,
        image: currentVariant?.images[0]?.url,
        special_price: currentSize?.pricing?.special_price || null,
        offer_price: currentSize.pricing?.offer_price,
        quantity: quantity
      }
      const addToCartResponse = await addToCart(cartItem)
      console.log("add to cart result : ", addToCartResponse?.data)
      await checkExistOnCart(addToCartResponse?.data?.items || [])
      setCart(addToCartResponse?.data)
      setLoading(false)
      location.reload()
    } catch (error) {
      setLoading(false)
      router.push('/auth/sign-in')
    }
  }

  const handleRemoveFromCart = async () => {
    setLoading(true)
    setQuentity(1)
    try {
      const removeFromCartResponse = await deleteCartItem(onCart)
      console.log("remove from cart result: ", removeFromCartResponse?.data)
      await checkExistOnCart(removeFromCartResponse?.data?.items)
      setCart(removeFromCartResponse?.data)
      setLoading(false)
      location.reload()
    } catch (error) {
      setLoading(false)
      console.log("error: ", error.response.data)
    }
  }

  const handleIncQuantity = async () => {
    setQuentity(quantity+1)
  }

  const handleDecQuantity = async () => {
    setQuentity(quantity-1)
  }

  const handleCurrentVariantChange = async (variant) => {
    setCurrentVariant(variant); 
    setCurrentSize(variant?.sizes[0])
    checkExistOnCart(cart?.items)
    
  }

  const handleCreateConversation = async (vendor_id) => {
    try {
      const conversation = await createCustomerConversation({vendor_id})
      console.log(conversation?.data)
      router.push('/chat/message-center')
      
    } catch (error) {
      console.log(error?.response)
    }
  }

  return (
    <div className='mt-[48px] sm:mt-0'>
      {/* Topbar */}
      <div className='bg-[#FAFAFA] py-4'>
        <div className='container mx-auto'>
          <div>
            <ul className='flex px-2 sm:px-0 justify-between sm:justify-start items-center'>
              <li className='sm:mr-8'>
                <Link passHref  href="/"><h4 className='sm:text-xl font-semibold text-gray-500 hover:cursor-pointer'>Store Home</h4></Link>
              </li>
              <li className='sm:mr-8 hidden sm:block'>93.0% Positive feedback</li>
              <li className='sm:mr-8 text-sm sm:text-md'>1335 Followers</li>
              <li className='sm:mr-8'>
                <button className='bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-sm sm:text-md sm:px-8 sm:py-2 text-white rounded-full shadow-sm'>Follow</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Main Section */}
      <div className='bg-white py-8 mb-8'>
        <div className='container mx-auto'>
        <h1 className='mx-2 mb-2 sm:hidden'>{product?.product_name}</h1>
          <div className='grid grid-cols-10 gap-4'>
            {/* Image Container */}
            <div className='col-span-10 sm:col-span-4'>
              <div>
              {/* src={data?.variant_stock_price[0]?.images[0]?.url} */}
              <Image alt="image"  
                src={currentVariant.images[0]?.url}
                width="100%" 
                height="100%" 
                layout="responsive" 
                objectFit="contain"
                />
              </div>
            </div>
            <div className='col-span-10 sm:col-span-5 px-2 sm:px-0'>
              <div>
                <h1 className='hidden sm:block'>{product?.product_name}</h1>
                <div className='flex justify-between sm:justify-start items-center mt-4 text-sm'>
                  <div className='mb-2 sm:mb-0 sm:mr-2'>
                    {product?.rating > 0 &&<i className="fa-solid fa-star text-amber-500 mr-1"></i> }
                    {product?.rating > 1 &&<i className="fa-solid fa-star text-amber-500 mr-1"></i> }
                    {product?.rating > 2 &&<i className="fa-solid fa-star text-amber-500 mr-1"></i> }
                    {product?.rating > 3 &&<i className="fa-solid fa-star text-amber-500 mr-1"></i> }
                    {product?.rating > 4 &&<i className="fa-solid fa-star text-amber-500 mr-1"></i> }
                    {product?.rating == 0 &&<span className='bg-yellow-200 text-yellow-700 px-2 py-1 rounded-md shadow-sm'>New</span> }
                    
                  </div>
                  <div className='mr-3'>
                    {product?.rating != 0 && product?.rating }
                  </div>
                  <div className='mr-3'>
                    {product?.reviews.length != 0 ? product?.reviews.length+' Reviews' : 'No Reviews'}
                  </div>
                  <div className='mr-3'>
                    {product?.orders?.length != 0 ? product?.orders?.length+' Orders' : 'No Orders'}
                  </div>
                </div>
                <div className='flex items-center mt-4'>
                  <p className='font-semibold'>{product?.brand}</p>
                  <small className='hover:cursor-pointer ml-4 border border-green-400 p-2 rounded' onClick={() => handleCreateConversation(product?.vendor_id)}>
                    Chat
                  </small>
                </div>
                <div className='border-y my-8 py-4'>
                  <div className='flex items-center'>
                    <span className='text-2xl font-semibold mr-4'>BDT ৳{parseInt(currentSize.pricing.special_price).toLocaleString()}</span>
                    <span className='line-through'>BDT ৳{parseInt(currentSize.pricing.price).toLocaleString()}</span>
                    <span className='ml-4 bg-red-200 text-red-600 px-2'>-{Math.round(((parseInt(currentVariant.sizes[0].pricing.price)-parseInt(currentVariant.sizes[0].pricing.special_price))*100)/parseInt(currentVariant.sizes[0].pricing.price))}%</span>
                  </div>
                </div>
                {/* Varient's Images */}
                <div className='mb-8'>
                  <h4 className='mb-2'>Images: </h4>
                  <div className='flex'>
                    {
                      currentVariant?.images.map((image,index) => (
                        <div key={index} className='h-16 w-16 border p-1 rounded mr-4 hover:cursor-pointer'>
                          <Image alt="image"  
                            src={image?.url}
                            width="100%" 
                            height="100%" 
                            layout="responsive" 
                            objectFit="contain"
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
                {/* Colors */}
                <div className='mb-8 flex'>
                  {product?.variant_stock_price.map((variant, index) => (
                  <div key={index}>
                    { 
                      currentVariant?.color_family == variant.color_family 
                      ? <div onClick={() => handleCurrentVariantChange(variant)} key={index} className='mr-2 bg-[#D23E41] text-white hover:cursor-pointer inline-block px-4 py-2 rounded '>
                        <h4>{variant.color_family}</h4>
                      </div>
                      : <div onClick={() => handleCurrentVariantChange(variant)} key={index} className='mr-2 bg-gray-100 hover:cursor-pointer inline-block px-4 py-2 rounded '>
                        <h4>{variant.color_family}</h4>
                      </div>
                    }
                  </div>
                  ))}
                </div>
                {/* Sizes */}
                <div className='mb-8'>
                  {currentVariant?.sizes.map((size, index) => (
                    currentSize?.size === size?.size 
                      ? <div onClick={()=> setCurrentSize(size)} key={index} className='bg-[#D23E41] text-white font-semibold mr-3 hover:cursor-pointer inline-block px-2 py-1 rounded '>
                          <h4>{size.size}</h4>
                        </div>
                      : <div onClick={()=> setCurrentSize(size)} key={index} className='bg-gray-100 font-semibold mr-3 hover:cursor-pointer inline-block px-2 py-1 rounded '>
                          <h4>{size.size}</h4>
                        </div>
                  ))}
                </div>
                {/* Add Quantity */}
                <div>
                  <div className='mb-3'>Quantity: </div>
                  <div className='flex items-center'>
                    <div className='mr-4'>
                      {quantity > 1 && <i onClick={handleDecQuantity} className="fa-light fa-circle-minus text-2xl hover:cursor-pointer"></i>}
                      <span className='text-2xl mx-2'>{quantity}</span>
                      {(quantity < 5 || quantity < parseInt(currentSize.quantity)) && <i onClick={handleIncQuantity} className="fa-light fa-circle-plus text-2xl hover:cursor-pointer"></i>}
                    </div>
                    <span>In Stock: {currentSize.quantity}</span>
                  </div>
                </div>
                {/* Action area */}
                <div className='mt-4'>
                  <div className='grid grid-cols-2 gap-2 sm:block'>
                    <button onClick={() => dispatch(addToCart({...product, quantity}))} className='w-full sm:w-auto col-span-1 hover:shadow-md text-white px-4 py-2 sm:px-16 bg-gradient-to-r from-violet-500 to-fuchsia-500 mr-4 sm:p-4 font-semibold rounded-md'>Buy Now</button>
                    { !onCart
                      ?<button onClick={handleAddToCart} className='w-full sm:w-auto col-span-1 hover:shadow-md text-white sm:px-16 bg-gradient-to-r from-sky-500 to-indigo-500 mr-4 px-4 py-2 sm:p-4 font-semibold rounded-md focus:shadow-md transition-all duration-200'>
                        {loading?<i className="fa-solid fa-loader animate-spin"></i>:'Add To Cart'}
                      </button>
                      :<button onClick={handleRemoveFromCart} className='w-full sm:w-auto col-span-1 hover:shadow-md text-white px-4 py-2 sm:px-16 bg-gradient-to-r from-sky-500 to-indigo-500 mr-4 sm:p-4 font-semibold rounded-md focus:shadow-md transition-all duration-200'>
                        {loading?<i className="fa-solid fa-loader animate-spin"></i>:'Remove'}
                      </button>
                    }
                    <button className='col-span-2 border py-2 px-4 sm:p-4 rounded-md'>
                      <i className="fa-light fa-heart mr-1"></i>
                      15.8K
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Varients by images */}
          <div className='mt-4 flex mx-2 sm:mx-0'>
            {
              product?.variant_stock_price.map((varient, index) => (
                <div  onClick={() => setCurrentVariant(varient)} key={index} className='h-20 w-20 border p-1 rounded mr-4 hover:cursor-pointer'>
                  <Image alt="image"  
                    src={varient?.images[0]?.url}
                    width="100%" 
                    height="100%" 
                    layout="responsive" 
                    objectFit="contain"
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <div className='container mx-auto bg-white my-8  rounded-lg shadow-md'>
          <div className='text-center text-xl border-b py-4'>
            Short Description
          </div>
          <div className='p-4'>
            {product?.short_description}
          </div>
        </div>
        <div className='container mx-auto bg-white my-8  rounded-lg shadow-md'>
          <div className='text-center text-xl border-b py-4'>
            Long Description
          </div>
          <div className='p-4'>
            {HTMLReactParser(product?.long_description)}
          </div>
        </div>
        {/* Table */}
        <div className='container mx-auto bg-white my-8  p-4 rounded-lg shadow-md'>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Dangerous Goods
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
              None
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Package Height
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
            {product?.package_dimensions?.height}
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Package Width
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
            {product?.package_dimensions?.width}
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Package Lenght
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
            {product?.package_dimensions?.length}
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Package Weight
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
              1
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-t'>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              Warranty
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
              {product?.warranty_type}
            </div>
          </div>
          <div className='grid grid-cols-6 border-x border-y '>
            <div className='col-span-2 sm:col-span-1 border-r p-2'>
              What is in the box
            </div>
            <div className='col-span-4 sm:col-span-5 pl-4 p-2'>
              {product?.whats_in_the_box}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths(){
  const response = await AllProducts();
  const products = response.data
  const paths = products.map(product => {
    return{
      params: {
        slug: product.slug
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps(context) {
  const { params } = context
  console.log("params: ", params)
  const response = await getSingleProduct(params.slug)
  console.log("product data: ",response.data)
    return {
      props: {
        product: response.data
      }, // will be passed to the page component as props
      revalidate: 10,
    }
  }

  
