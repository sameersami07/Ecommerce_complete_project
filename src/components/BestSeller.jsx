import React, { useEffect, useState, useContext } from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext'
import ProductItem from './productItem'

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
      if (!products || !products.length) return;
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));

    }, [products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio fugit atque exercitationem quibusdam quod consequatur! Maiores dicta asperiores officia harum pariatur beatae, ad blanditiis nisi alias quasi distinctio dolore voluptates?
            </p>

        </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item) => (
          <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
     
    </div>
  )
}

export default BestSeller
