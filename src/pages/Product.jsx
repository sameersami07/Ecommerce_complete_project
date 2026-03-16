import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products,currency,addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product image */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image && productData.image.map((item, index) => (
              <img key={index} onClick={() => setImage(item)} src={item} alt={`Product ${index}`} className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' />
            ))}
          </div>
          <div className='w-full sm:w-[81.3%]'>
            <img src={image} alt="Product" className='w-full h-auto object-cover' />
          </div>
        </div>

        {/* Product info */}
        <div className='flex-1'>
          <h1 className='text-2xl font-bold mb-3'>{productData.name}</h1>
          
          {/* Star rating */}
          <div className='flex items-center gap-1 mb-3'>
            {[...Array(5)].map((_, index) => (
              <img 
                key={index} 
                src={index < 4 ? assets.star_icon : assets.star_dull_icon} 
                alt="Star" 
                className='w-4 h-4'
              />
            ))}
            <p className='pl-2'>(122)</p>
          </div>

          {/* Price */}
          <p className='text-3xl font-bold mb-5'>${productData.price}</p>

          {/* Description */}
          <p className='text-gray-600 mb-5'>{productData.description}</p>

          {/* Size selection */}
          <div className='mb-5'>
            <p className='font-semibold mb-3'>Select Size</p>
            <div className='flex gap-3'>
              {productData.sizes && productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSize(item)}
                  className={`px-4 py-2 border cursor-pointer ${size === item ? 'border-black bg-black text-white' : 'border-gray-300'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to cart button */}
          <button 
            onClick={() => {
              if (size) {
                addToCart(productData._id, size);
                toast.success(`Added ${productData.name} to cart!`);
              } else {
                toast.error('Please select a size');
              }
            }}
            className='bg-black text-white px-8 py-3 text-sm font-semibold mb-5 hover:bg-gray-800 transition'
          >
            ADD TO CART
          </button>
          <ToastContainer />

          {/* Additional info */}
          <div className='border-t pt-5 space-y-3 text-sm text-gray-600'>
            <p><span className='font-semibold text-black'>100% Original Product</span> - We guarantee authentic products</p>
            <p><span className='font-semibold text-black'>Cash on Delivery Available</span> - Easy payment option for this product</p>
            <p><span className='font-semibold text-black'>Easy Return and Exchange Policy</span> - 7 days return policy for all items</p>
          </div>

          {/* Reviews section */}
          <div className='border-t mt-5 pt-5'>
            <h2 className='text-lg font-bold mb-3'>Reviews (122)</h2>
            <p className='text-gray-600'>This is an amazing product! Great quality and fast delivery. Highly recommended!</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className='mt-20'>
        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;
