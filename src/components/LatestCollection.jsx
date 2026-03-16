import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './productItem'

const LatestCollection = () => {
  const { products }= useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  useEffect(() => {
    if (!products || !products.length) return;
    const sorted = [...products].sort((a, b) => b.date - a.date);
    setLatestProducts(sorted.slice(0, 10));
  }, [products]);
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio fugit atque exercitationem quibusdam quod consequatur! Maiores dicta asperiores officia harum pariatur beatae, ad blanditiis nisi alias quasi distinctio dolore voluptates?
        </p>
      </div> 
      {/* Rendering products */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          latestProducts.map((item) => (
            <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))

        }
      </div>  

    </div>

      
  )
}

export default LatestCollection
