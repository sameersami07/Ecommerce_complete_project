import React from 'react'
import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './productItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category || !subCategory || !products?.length) {
      setRelatedProducts([]);
      return;
    }

    const filtered = products
      .filter((item) => item.category === category && item.subCategory === subCategory)
      .slice(0, 5);

    setRelatedProducts(filtered);
  }, [products, category, subCategory]);

    return (

    <div className='my--24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4  gap-y-6'>
        {relatedProducts.map((item) => (
            <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}    
      </div>
    </div>
  )
}

export default RelatedProducts
