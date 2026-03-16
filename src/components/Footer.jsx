import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
           <img src={assets.logo} className='mb-5 w-32' alt="logo" />
           <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
           </p>
        </div> 
        <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className=' flex flex-col gap-1 text-gray-600'>
                <li className='mb-2'>Home</li>
                <li className='mb-2'>About us</li>
                <li className='mb-2'>Delivery</li>
                <li className='mb-2'>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className=' flex flex-col gap-1 text-gray-600'>
                <li>+91 9876543210</li>
                <li>contact@foreveryou.com</li>
            </ul>
        </div>   
               
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center '>&copy; 2026 Forever You. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
