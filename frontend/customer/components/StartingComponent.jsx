import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { getCustomerCart, updateCartOnDB } from '../adapters/cart'
import { updateCart } from '../redux/cart/cartActions'
import { setUserData } from '../redux'
import { getUserData } from '../adapters/user'
import { useRouter } from 'next/router'


export default function StartingComponent() {
  const dispatch = useDispatch()
  const router = useRouter()
  


  useEffect(()=> {
    const handleLogout = () => {
      localStorage.clear()
      sessionStorage.clear()
      router.push('/auth/sign-in')
      Object.keys(Cookies.get()).forEach(function(cookieName) {
        var neededAttributes = {
          // Here you pass the same attributes that were used when the cookie was created
          // and are required when removing the cookie
        };
        Cookies.remove(cookieName, neededAttributes);
      });
    }
    const initialFunc = async()=>{
      console.log("starting component working!")
      
        try {
          const userResponse = await getUserData()
          const cartResponse = await getCustomerCart();
          dispatch(setUserData(userResponse?.data))
          dispatch(updateCart(cartResponse?.data))
        } catch (error) {
          handleLogout()
        }
    }
    initialFunc()
  }, [])

  return (
    <div>...</div>
  )
}
