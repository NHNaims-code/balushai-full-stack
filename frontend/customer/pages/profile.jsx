import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getUserData } from '../adapters/user'
import InputField from '../components/common/InputField'

export default function Profile() {
  const [addressData, setAddressData] = useState({})

  const handleChange = (e) => {
    const newAddressData = addressData
    newAddressData[e.target.name] = e.target.value
    setAddressData(newAddressData)
    console.log("address: ", addressData)
  }

  useEffect(() => {
    const fetcher = async () => {
      try {
        const userResponse = await getUserData()
        setAddressData(userResponse?.data)
        console.log("userdata: ", userResponse?.data)
      } catch (error) {
        
      }
    }
    fetcher()
  }, [])
  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-6 gap-4'>
        <div className='col-span-4 bg-white rounded-md p-4'>
          <h4 className='text-center text-xl border-b-2 pb-2 mb-4'>Address</h4>
          <form>
           <InputField name='full_name' value={addressData?.name} label="Full Name" type="text" onChange={handleChange}/>
           <InputField name='phone' value={addressData?.phone} label="Phone" type="number" onChange={handleChange}/>
           <InputField name='region' value={addressData?.email} label="Regione" type="text" onChange={handleChange}/>
           <InputField name='city' value={addressData?.city} label="City" type="text" onChange={handleChange}/>
           <InputField name='area' value={addressData?.area} label="Area" type="text" onChange={handleChange}/>
           <InputField name='address' value={addressData?.address} label="Address" type="text" onChange={handleChange}/>
            <div className='flex justify-center mt-4'>
              <div className='flex items-center'>
                <label htmlFor='default_shipping_address' className='mr-2'>Default shipping address</label>
                <input name='default_shipping_address' onChange={handleChange} type='checkbox'/>
              </div>
            </div>
          <div>
            {
              addressData !== {}
              && <button className='bg-[#D23E41] w-full p-2 text-white rounded-lg mt-4 transition-all duration-150'>Update</button>
            }
          </div>
          </form>
        </div>
        <div className='flex flex-col justify-center items-center col-span-2 bg-white rounded-md p-4'>
          <label htmlFor='profileImage' className='w-48 h-48 overflow-hidden flex justify-center items-center bg-cover bg-center bg-no-repeat hover:cursor-pointer rounded-full border'
            style={{backgroundImage: `url('/images/default-user.png')`}}
          />
          <input type='file' id='profileImage' className='hidden' accept="image/png, image/gif, image/jpeg, image/webp"/>
          <h4 className='text-xl text-center mt-8'>Profile Photo</h4>
        </div>
      </div>
    </div>
  )
}
