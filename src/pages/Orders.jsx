import React, { useEffect, useState } from 'react'
import Title from '../components/Title'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(stored)
  }, [])

  return (
    <div className='border-t pt-14 min-h-[80vh]'>
      <div className='text-2xl mb-6'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      {orders.length === 0 ? (
        <p className='text-gray-500'>No orders yet.</p>
      ) : (
        <div className='flex flex-col gap-6'>
          {orders.map((order) => (
            <div key={order.id} className='border border-gray-200 rounded-md p-4'>
              <div className='flex items-center justify-between gap-4 flex-wrap'>
                <div className='text-sm text-gray-600'>
                  <p><span className='font-medium text-gray-800'>Order:</span> {order.id}</p>
                  <p><span className='font-medium text-gray-800'>Status:</span> {order.status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Tracking not implemented yet for ${order.id}`)}
                  className='px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50'
                >
                  Track Order
                </button>
              </div>

              <div className='mt-4 flex flex-col gap-3'>
                {order.items?.map((item, idx) => (
                  <div key={`${order.id}-${idx}`} className='flex items-center justify-between gap-4 border-t pt-3'>
                    <div className='flex items-center gap-4'>
                      {item.image && (
                        <img src={item.image} alt={item.name} className='w-16 h-20 object-cover rounded' />
                      )}
                      <div>
                        <p className='text-sm font-medium text-gray-800'>{item.name}</p>
                        <p className='text-xs text-gray-500'>
                          Size: {item.size} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className='text-sm font-medium text-gray-800'>
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className='mt-4 flex justify-end text-sm font-semibold text-gray-800'>
                Total: ${Number(order.amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
