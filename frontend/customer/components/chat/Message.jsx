import React from 'react'

export default function Message({messages}) {
  console.log("Messa:",messages)
  return (
    <div className='bg-white  rounded-md h-[480px] relative '>
      <div>
        <h4 className='text-center text-2xl border-b-4 py-4'>BD Fashion</h4>
        {
          messages?
          <div>
            {
              messages.map((message, index) => {
                return <div key={index}>
                {/* LHS */}
                {
                  message.sender === 'VENDOR' &&
                  <div>
                    <div className=' inline-block mx-4 mt-4 group hover:cursor-pointer'>
                      <p className='text-sm ml-2 text-gray-400 mb-1'>Nimur Hasan</p>
                      <div className='rounded-full px-4 py-2 shadow-sm bg-teal-100 text-teal-600'>
                        {message.text}
                      </div>
                      <p className='text-sm mr-2 transition-all duration-100 opacity-0 group-hover:opacity-100 text-gray-400 mt-1 text-right'>10 minutes ago</p>
                    </div>
                  </div>
                }
                {/* LHS */}
                {
                  message.sender === 'CUSTOMER' &&
                  <div className='flex justify-end'>
                    <div className=' inline-block mx-4 group hover:cursor-pointer'>
                      <p className='text-sm text-right mr-2 text-gray-400 mb-1'>BD Fashion</p>
                      <div className='rounded-full px-4 py-2 shadow-sm bg-pink-100 text-pink-600'>
                        {message.text}
                      </div>
                      <p className='text-sm ml-2 transition-all duration-100 opacity-0 group-hover:opacity-100 text-gray-400 mt-1 text-left'>10 minutes ago</p>
                    </div>
                  </div>
                }
                </div>
              })
            }
          </div>
          : <div className='text-2xl flex justify-center items-center mt-32 text-gray-200'>Select A Conversation</div>
        }
      </div>
      <div className='absolute bottom-0 mb-2 w-full flex bg-gray-100 h-[52px]'>
        <div className='flex w-full rounded-md overflow-hidden'>
          <label htmlFor='attach'>
            <i className="fa-solid fa-paperclip text-xl py-4 px-6 hover:cursor-pointer"></i>
          </label>
          <input id='attach' type='file' multiple className='hidden'/>
          <input className='px-4 flex-grow border h-full focus:border-0' type='text' placeholder='Type your message'/>
          <i className="fa-solid fa-paper-plane-top hover:cursor-pointer bg-[#D23E41] text-xl text-white px-6 py-4"></i>
        </div>
      </div>
    </div>
  )
}
