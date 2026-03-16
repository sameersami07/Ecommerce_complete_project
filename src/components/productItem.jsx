import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
    const { currency } = useContext(ShopContext);
  return (
    <Link className='text-gray-700 !text-gray-700 cursor-pointer text-center block' to={`/product/${id}`}>
        <div className='overflow-hidden rounded-md'>
            <img className='mx-auto hover:scale-105 transition-transform duration-300' src={image[0]} alt="product" />
        </div>

        <p className='pt-3 pb-1 text-base font-medium'>{name}</p>
        <p className='text-sm font-medium'>{currency} {price}</p>

    </Link>
  )
}

export default ProductItem
