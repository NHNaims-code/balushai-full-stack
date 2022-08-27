import React from 'react'

export default function SelectOption({options=[], selected, label, value, name, placeholder, required=false, onChange, type="text"}) {
  return (
    <div className='grid grid-cols-6 my-2 bg-[#d23e41] sm:bg-transparent'>
      {label 
        && <label htmlFor={name} className='col-span-1 flex items-center justify-end sm:mr-4'>
        {label} :
      </label>
      }
      <div className='col-span-5 '>
      <select onChange={onChange} required={required} className='outline-none border  w-full sm:p-2'>
        <option>Select</option>
        {
          options.map((option, index) => (<option selected={option.key === selected} className='hover:bg-[#D23E41]' key={index} value={option?.value}>{option?.key}</option>))
        }
      </select>
      </div>
    </div>
  )
}
