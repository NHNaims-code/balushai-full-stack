import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className='bg-white'>
      <div className='container mx-auto mb-4 p-4'>
        {/* Footer section 1 */}
        <div className='grid sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:divide-x border-b p-4 pb-8 '>
          <div className='p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-3xl'><i className="fa-light fa-circle-dollar"></i></span>
              <h4 className='text-md font-semibold my-4'>Great value</h4>
              <p className='text-center text-gray-400 text-sm'>We offer competitive prices on over 100 million items.</p>
            </div>
          </div>
          <div className='p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-3xl'><i className="fa-light fa-truck"></i></span>
              <h4 className='text-md font-semibold my-4'>Worldwide shopping</h4>
              <p className='text-center text-gray-400 text-sm'>We ship to over 200 countries and regions, and our site comes in 12 languages.</p>
            </div>
          </div>
          <div className='p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-3xl'><i className="fa-light fa-credit-card"></i></span>
              <h4 className='text-md font-semibold my-4'>Safe payment</h4>
              <p className='text-center text-gray-400 text-sm'>Pay with the world’s most popular and secure payment methods.</p>
            </div>
          </div>
          <div className='p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-3xl'><i className="fa-light fa-shield-check"></i></span>
              <h4 className='text-md font-semibold my-4'>Shop with confidence</h4>
              <p className='text-center text-gray-400 text-sm'>Our Buyer Protection policy covers your entire purchase journey.</p>
            </div>
          </div>
          <div className='p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-3xl'><i className="fa-light fa-headset"></i></span>
              <h4 className='text-md font-semibold my-4'>Help center</h4>
              <p className='text-center text-gray-400 text-sm'>Round-the-clock assistance for a smooth shopping experience.</p>
            </div>
          </div>
          <div className='p-4'>
            <div className='flex flex-col items-center'>
              <span className='text-3xl'><i className="fa-brands fa-google-play"></i></span>
              <h4 className='text-md font-semibold my-4'>Shop better</h4>
              <p className='text-center text-gray-400 text-sm'>Download the app for mobile-only features such as image search and discount games.</p>
            </div>
          </div>
        </div>
        {/* Footer section 2 */}
        <div>
          <div className='grid sm:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-y-8 mt-8 py-8 p-4'>
            <div className='xl:col-span-2 xl:p-4'>
              <div>
                <h4 className='text-xl mb-2 font-semibold text-gray-600'>Stay connected</h4>
                <div>
                  <ul className='flex'>
                    <li className='transition-all duration-100 text-3xl mr-4 hover:cursor-pointer hover:text-blue-500'><i className="fa-brands fa-facebook"></i></li>
                    <li className='transition-all duration-100 text-3xl mr-4 hover:cursor-pointer hover:text-red-500'><i className="fa-brands fa-youtube"></i></li>
                    <li className='transition-all duration-100 text-3xl mr-4 hover:cursor-pointer hover:text-fuchsia-500'><i className="fa-brands fa-instagram"></i></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className=''>
              <div>
                <h4 className='text-lg font-semibold'>Customer service</h4>
                <ul className='mt-2'>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Customer service</Link></li>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Transaction Services Agreement</Link></li>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Take our feedback survey</Link></li>
                </ul>
              </div>
            </div>
            <div className=''>
              <div>
                <h4 className='text-lg font-semibold'>Collaborate with us</h4>
                <ul className='mt-2'>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Partnerships</Link></li>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Affiliate program</Link></li>
                </ul>
              </div>
            </div>
            <div className=''>
              <div>
                <h4 className='text-lg font-semibold'>Shopping with us</h4>
                <ul className='mt-2'>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Making payments</Link></li>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Delivery options</Link></li>
                  <li className='mt-2 text-sm text-gray-400'><Link passHref  href='#'> Buyer Protection</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer 3 section */}
      <div className='bg-[#333333] py-4'>
        <div className='container mx-auto text-gray-400 flex justify-center items-center'>
        ©️2022-{new Date().getFullYear()} Balushai.com. All rights reserved.
        </div>
      </div>
    </div>
  )
}
