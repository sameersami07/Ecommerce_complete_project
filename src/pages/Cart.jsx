import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  // Get cart item details from products
  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;
    cartData.forEach(item => {
      const product = products.find(p => p._id === item._id);
      if (product) {
        total += product.price * item.quantity;
      }
    });
    return total;
  };

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.length === 0 ? (
          <div className='text-center py-10'>
            <p className='text-gray-500 text-lg'>Your cart is empty</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className='grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_1fr] gap-4 sm:gap-6 border-b py-5 text-gray-700'>
              <div className='text-sm sm:text-base font-medium'>PRODUCT</div>
              <div className='text-sm sm:text-base font-medium'>QUANTITY</div>
              <div className='text-sm sm:text-base font-medium text-right'>PRICE</div>
            </div>

            {/* Display each cart item */}
            {cartData.map((item) => {
              const product = products.find(p => p._id === item._id);
              if (!product) return null;

              return (
                <div key={`${item._id}-${item.size}`} className='grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_1fr] gap-4 sm:gap-6 items-center border-b py-5'>
                  <div className='flex gap-4 sm:gap-6'>
                    <img src={product.image[0]} alt={product.name} className='w-16 sm:w-20 h-20 sm:h-24 object-cover rounded' />
                    <div className='flex flex-col justify-center gap-2'>
                      <p className='text-sm sm:text-base font-medium text-gray-700'>{product.name}</p>
                      <div className='flex gap-5'>
                        <p className='text-gray-500 text-sm'>{currency}{product.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm'>{item.size}</p>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button 
                      onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                      className='px-2 py-1 border border-gray-300 hover:bg-gray-200'
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateQuantity(item._id, item.size, parseInt(e.target.value) || 0)}
                      className='w-8 text-center border border-gray-300 py-1'
                    />
                    <button 
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      className='px-2 py-1 border border-gray-300 hover:bg-gray-200'
                    >
                      +
                    </button>
                  </div>

                  <div className='text-right flex flex-col items-end gap-3'>
                    <p className='text-sm sm:text-base font-medium'>{currency}{(product.price * item.quantity).toFixed(2)}</p>
                    <img 
                      onClick={() => removeFromCart(item._id, item.size)} 
                      src={assets.bin_icon} 
                      alt="Remove" 
                      className='w-4 cursor-pointer hover:opacity-75'
                    />
                  </div>
                </div>
              );
            })}

            {/* Cart Summary */}
            <div className='flex justify-end w-full'>
              <div className='w-full sm:w-[450px] mt-10'>
                <div className='w-full mb-8'>
                  <Title text1={'CART'} text2={'TOTALS'} />
                </div>

                <div className='flex flex-col gap-2 text-gray-700'>
                  <div className='flex justify-between py-2 border-b'>
                    <p>Subtotal</p>
                    <p>{currency}{calculateTotal().toFixed(2)}</p>
                  </div>
                  <div className='flex justify-between py-2 border-b'>
                    <p>Shipping Fee</p>
                    <p>{currency}10.00</p>
                  </div>
                  <div className='flex justify-between py-3'>
                    <p className='font-semibold'>Total</p>
                    <p className='font-semibold'>{currency}{(calculateTotal() + 10).toFixed(2)}</p>
                  </div>
                </div>

                <Link
                  to="/place-order"
                  className='block text-center w-full bg-black text-white py-3 text-sm font-medium mt-8 hover:bg-gray-800 transition'
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
