import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, getAllAddresses, updateAddress } from '../adapters/address'
import { deleteCartAllItem, getCustomerCart } from '../adapters/cart'
import { createOrder } from '../adapters/order'
import { getUserData } from '../adapters/user'
import InputField from '../components/common/InputField'
import SelectOption from '../components/common/SelectOption'
import { updateCart } from '../redux/cart/cartActions'

export default function Checkout() {
  const router = useRouter()
  const dispatch = useDispatch()

  const BILLING_ADDRESS = 'BILLING_ADDRESS'
  const SHIPPING_ADDRESS = 'SHIPPING_ADDRESS'
  const PAYMENT_INFO = 'PAYMENT_INFO'
  const [userData, setUserData] = useState(null)
  const [cart_products, setCartProducts] = useState([])
  const [currentState, setCurrentState] = useState(BILLING_ADDRESS)
  const [billingAddress, setBillingAddress] = useState({})
  const [shippingAddress, setShippingAddress] = useState({})
  const [paymentInfo, setPaymentInfo] = useState({amount: 0, method: 'COD'})
  const [totalAmount, setTotalAmount] = useState(0)
  const [errMsg, setErrMsg] = useState(null)


  const paymentMethods = [
    {key: 'COD', value: 'COD'}
  ]

  useEffect(() => {
    const fetcher = async () => {
      try {
        const userResponse = await getUserData()
        setUserData(userResponse?.data)
      } catch (error) {
        router.push("/auth/sign-in")
      }

      try {
        const addressResponse = await getAllAddresses()
        console.log('all adds: ', addressResponse?.data)
        addressResponse?.data?.address?.map(address => {
          if(address.default_shipping_address){
            setShippingAddress(address.default_shipping_address)
            setBillingAddress(address.default_shipping_address)
            return
          }else{
            setBillingAddress(address)
            setShippingAddress(address)
          }
        })
        const cartItemsResponse = await getCustomerCart()
        setCartProducts(cartItemsResponse?.data?.items)
        let tempTotalAmount = 0
        cartItemsResponse?.data?.items?.map(item => {
          tempTotalAmount = tempTotalAmount + item?.special_price * item?.quantity
        })
        setTotalAmount(tempTotalAmount)
        console.log("items on cart: ", cartItemsResponse?.data?.items)
      } catch (error) {
        
      }
    }

    fetcher()

  },[])


  const handleChange = (e) => {
    if(currentState === BILLING_ADDRESS){
      const newBillingAddress = billingAddress
      newBillingAddress[e.target.name] = e.target.value
      setBillingAddress(newBillingAddress)
    }
    if(currentState === SHIPPING_ADDRESS){
      const newShippingAddress = shippingAddress
      newShippingAddress[e.target.name] = e.target.value
      setShippingAddress(newShippingAddress)
    }
    if(currentState === PAYMENT_INFO){
      const newPaymentInfo = paymentInfo
      newPaymentInfo[e.target.name] = e.target.value
      setPaymentInfo(newPaymentInfo)
    }
  }

  const handleBillingAddressSubmit = async(e) => {
    e.preventDefault()
    console.log(billingAddress)
    try {
        if(billingAddress._id){
          const updateResponse = await updateAddress(billingAddress._id, billingAddress)
          setBillingAddress(updateResponse?.data)
          setCurrentState(SHIPPING_ADDRESS)
          setErrMsg(null)
        }else{
          const response = await createAddress(billingAddress)
          setBillingAddress(response.data)
          setCurrentState(SHIPPING_ADDRESS)
          setErrMsg(null)
        }
    } catch (error) {
      setErrMsg(error.response?.data?.err)
      console.log(error.response?.data?.err)
    }
  }

  const handleShippingAddressSubmit = async(e) => {
    e.preventDefault()
    try {
      if(shippingAddress._id){
          const response = await updateAddress(shippingAddress._id, shippingAddress)
          setShippingAddress(response?.data)
          setCurrentState(PAYMENT_INFO)
          setErrMsg(null)
      }else{
        const response = await createAddress(shippingAddress)
          setShippingAddress(response.data)
          setCurrentState(PAYMENT_INFO)
          setErrMsg(null)
      }
    } catch (error) {
      setErrMsg(error.response?.data?.err)
      console.log(error.response)
    }
  }

  const handleOrderSubmit = async(e) => {
    e.preventDefault()
    const newCartProducts = cart_products?.map(product => {
      return {
        quantity: product?.quantity,
        vendor_id: product?.vendor_id,
        product_id: product?.product_id?._id,
        price: product?.special_price,
        name: product?.product_id?.product_name,
        color: product?.color_family,
        image: product?.image,
        size: product?.size,
        shipment_fee: 0 
      }
     })
    const order = {
      products: newCartProducts,
      payment_information: paymentInfo,
      billing_address: billingAddress._id,
      shipping_address: shippingAddress._id
    }
    console.log(order)
    try {
      const response = await createOrder(order)
      if(response?.data){
        const deleteCartItemsRes = await deleteCartAllItem()
        console.log("deleteCartItemsRes: ", deleteCartItemsRes.data)
        location.href='/order'
      }
    } catch (error) {
      setErrMsg(error.response?.data?.err)
      console.log('something went worng. try again! order -> 140')
    }
    console.log("place order: ", order)
  }

  if(!userData){
    return<div className='container mx-auto flex justify-center items-center p-32 bg-white'>Auth Checking...</div>
  }else{
    return (
      <div className='container mx-auto mt-[58px] sm:mt-0 px-2 sm:px-0'>
        <div>
          <h4 className='text-center mt-8 text-2xl border-b pb-4 font-bold'>Checkout</h4>
        </div>
       {errMsg && <div className='sm:w-3/5 mx-auto flex justify-between p-2 bg-red-100 text-red-600 border border-[#d23e41]/50'>
          {errMsg}
          <div onClick={() => setErrMsg(null)} className=' ml-2 hover:cursor-pointer hover:rotate-180 transition-all duration-300'>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>}
        <div className='mt-4 mb-12 flex justify-center'>
          <div className='sm:w-3/5 bg-white rounded-md overflow-hidden shadow-sm'>
            <div className='grid grid-cols-3 bg-gray-400 text-white mb-4'>
              <div className={`col-span-1 border-b border-r text-center py-2 text-sm sm:text-lg ${currentState == BILLING_ADDRESS && 'bg-[#D23E41] text-center border-b p-2 text-white'}`}>BILLING ADDRESS</div>
              <div className={`col-span-1 border-b border-r text-center py-2 text-sm sm:text-lg ${currentState == SHIPPING_ADDRESS && 'bg-[#D23E41] text-center border-b p-2 text-white'}`}>SHIPPING ADDRESS</div>
              <div className={`col-span-1 border-b border-r text-center py-2 text-sm sm:text-lg ${currentState == PAYMENT_INFO && 'bg-[#D23E41] text-center border-b p-2 text-white'}`}>PAYMENT INFORMATION</div>
            </div>
            {
              currentState === BILLING_ADDRESS
              &&
              <form className=' p-4' onSubmit={handleBillingAddressSubmit}>
                <InputField value={billingAddress?.full_name} name='full_name' label="Full Name" type="text" onChange={handleChange} required={true}/>
                <InputField value={billingAddress?.phone} type="text" name='phone' label="Phone" onChange={handleChange} required={true}/>
                <InputField value={billingAddress?.region} name='region' label="Regione" type="text" onChange={handleChange} required={true}/>
                <InputField value={billingAddress?.city} name='city' label="City" type="text" onChange={handleChange} required={true}/>
                <InputField value={billingAddress?.area} name='area' label="Area" type="text" onChange={handleChange} required={true}/>
                <InputField value={billingAddress?.address} name='address' label="Address" type="text" onChange={handleChange} required={true}/>
                <div className='flex justify-end'>
                  <button type='submit' className='bg-[#D23E41] py-2 px-4 hover:shadow-md text-white mt-4 rounded-lg'>Next</button>
                </div>
              </form>

            }
            {
              currentState === SHIPPING_ADDRESS
              &&
              <form className='p-4' onSubmit={handleShippingAddressSubmit}>
                <InputField value={shippingAddress?.full_name} name='full_name' label="Full Name" type="text" onChange={handleChange} required={true}/>
                <InputField value={shippingAddress?.phone} name='phone' label="Phone" type="tel" onChange={handleChange} required={true}/>
                <InputField value={shippingAddress?.region} name='region' label="Regione" type="text" onChange={handleChange} required={true}/>
                <InputField value={shippingAddress?.city} name='city' label="City" type="text" onChange={handleChange} required={true}/>
                <InputField value={shippingAddress?.area} name='area' label="Area" type="text" onChange={handleChange} required={true}/>
                <InputField value={shippingAddress?.address} name='address' label="Address" type="text" onChange={handleChange} required={true}/>
                <div className='flex justify-end'>
                  <button onClick={()=> {setCurrentState(BILLING_ADDRESS)}} className='bg-gray-400 py-2 px-4 hover:shadow-md text-white mt-4 rounded-lg'>Previous</button>
                  <button type='submit' className='bg-[#D23E41] py-2 px-4 ml-4 hover:shadow-md text-white mt-4 rounded-lg'>Next</button>
                </div>
              </form>
            }
            {
              currentState === PAYMENT_INFO
              &&
              <form className='p-4' onSubmit={handleOrderSubmit}>
                <div>
                  <div className='grid grid-cols-6'>
                    <span className='col-span-6 sm:col-span-1 text-right mr-2'>Amount: </span>
                    <span className='font-bold col-span-6 sm:col-span-5'>{parseInt(totalAmount).toLocaleString()}</span>
                  </div>
                  <div className='grid grid-cols-6 mt-2'>
                    <span className='col-span-6 sm:col-span-1 text-right mr-2'>Method: </span>
                    <span className='font-bold col-span-6 sm:col-span-5'>COD (cash on delivery)</span>
                  </div>
                </div>
              
                <div className='flex justify-end'>
                  <button onClick={()=> {setCurrentState(SHIPPING_ADDRESS)}} className='bg-gray-400 py-2 px-4 hover:shadow-md text-white mt-4 rounded-lg'>Previous</button>
                  <button type='submit' className='bg-[#D23E41] py-2 px-4 ml-4 hover:shadow-md text-white mt-4 rounded-lg'>CONFIRM</button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    )
  }
}
