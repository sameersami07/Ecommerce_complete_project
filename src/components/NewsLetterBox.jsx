import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>
             Subscribe now & get 20% off
        </p>
        <p className='text-gray-400 mt-3'>Join our newsletter for the latest updates and offers</p>
        <form>
            <input type="email" placeholder='Enter your email' className='border border-gray-300 rounded-l-full px-4 py-2 mt-5 focus:outline-none focus:ring-2 focus:ring-gray-400'/>
            <button type='submit' className='bg-gray-800 text-white rounded-r-full px-6 py-2 mt-5 hover:bg-gray-700 transition-colors'>Subscribe</button>
        </form>
      
    </div>
  )
}

export default NewsLetterBox
