import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import { useSelector } from 'react-redux'

export default function MobileFooter() {
  const router = useRouter()
  const cart = useSelector(state => state.cart?.data)
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white py-2 shadow-lg border-t-2 border-[#d23e41]'>
      <div className='flex justify-around'>
        <Link passHref  href="/" className='flex flex-col items-center'>
          <div className={`flex flex-col items-center text-sm ${router.pathname==='/' && 'text-[#d23e41]'}`}>
            <div><i className="fa-light fa-house text-2xl"></i></div>
            Home
          </div>
        </Link>
        <Link passHref  href='#'>
          <div className={`flex flex-col items-center text-sm ${router.pathname==='#' && 'text-[#d23e41]'}`}>
            <div><i className="fa-light fa-list text-2xl"></i></div>
            Category
          </div>
        </Link>
        <Link passHref  href='/cart'>
          <div className={`flex flex-col items-center text-sm relative ${router.pathname==='/cart' && 'text-[#d23e41]'}`}>
            <div><i className="fa-light fa-bag-shopping text-2xl"></i></div>
            Cart
            <div className='bg-[#d23e41] absolute -top-0 -right-2 shadow-lg text-xs text-white px-1 rounded-full'>
              {cart?.items?.length}
            </div>
          </div>
        </Link>
        <Link passHref  href='#'>
          <div className={`flex flex-col items-center text-sm ${router.pathname==='/profile' && 'text-[#d23e41]'}`}>
            <div><i className="fa-light fa-user text-2xl"></i></div>
            Account
          </div>
        </Link>
      </div>
    </div>
  )
}
