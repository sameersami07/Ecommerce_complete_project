import React, { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const PlaceOrder = () => {
  const navigate = useNavigate()
  const { cartItems, products, currency, delivery_fee, clearCart, user } = useContext(ShopContext)

  const [method, setMethod] = useState('cod') // 'stripe' | 'razorpay' | 'cod'
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const [error, setError] = useState('')

  const subtotal = useMemo(() => {
    let total = 0
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId)
      if (!product) continue
      const sizesObj = cartItems[productId]
      for (const size in sizesObj) {
        const qty = sizesObj[size]
        total += product.price * qty
      }
    }
    return total
  }, [cartItems, products])

  const shipping = subtotal > 0 ? delivery_fee : 0
  const total = subtotal + shipping

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const validate = () => {
    if (!form.firstName.trim()) return 'Please enter first name.'
    if (!form.lastName.trim()) return 'Please enter last name.'
    if (!form.email.trim()) return 'Please enter email address.'
    if (!form.street.trim()) return 'Please enter street.'
    if (!form.city.trim()) return 'Please enter city.'
    if (!form.state.trim()) return 'Please enter state.'
    if (!form.zipcode.trim()) return 'Please enter zipcode.'
    if (!form.country.trim()) return 'Please enter country.'
    if (!form.phone.trim()) return 'Please enter phone number.'
    if (subtotal === 0) return 'Your cart is empty.'
    return ''
  }

  const handlePlaceOrder = () => {
    if (!user) {
      navigate('/login')
      return
    }

    const message = validate()
    if (message) {
      setError(message)
      return
    }

    const items = []
    for (const productId in cartItems) {
      const product = products.find(p => p._id === productId)
      if (!product) continue
      const sizesObj = cartItems[productId]
      for (const size in sizesObj) {
        const qty = sizesObj[size]
        if (qty <= 0) continue
        items.push({
          _id: productId,
          name: product.name,
          image: product.image?.[0],
          price: product.price,
          size,
          quantity: qty
        })
      }
    }

    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'Ready to ship',
      paymentMethod: method,
      delivery: form,
      amount: total,
      items
    }

    const existing = JSON.parse(localStorage.getItem('orders') || '[]')
    localStorage.setItem('orders', JSON.stringify([newOrder, ...existing]))
    clearCart()
    navigate('/orders')
  }

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ---------Left side ---------*/}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div  className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} /> 
        </div>
        <form className='flex flex-col gap-4' onSubmit={(e) => { e.preventDefault(); handlePlaceOrder() }}>
          <div className='flex gap-3'>
            <input name="firstName" value={form.firstName} onChange={onChange} type="text" placeholder='First Name' className='w-full border border-gray-300 rounded-md p-2 outline-none' />
            <input name="lastName" value={form.lastName} onChange={onChange} type="text" placeholder='Last Name' className='w-full border border-gray-300 rounded-md p-2 outline-none' />
          </div>

          <input name="email" value={form.email} onChange={onChange} type="email" placeholder='Email Address' className='w-full border border-gray-300 rounded-md p-2 outline-none' />
          <input name="street" value={form.street} onChange={onChange} type="text" placeholder='Street' className='w-full border border-gray-300 rounded-md p-2 outline-none' />

          <div className='flex gap-3'>
            <input name="city" value={form.city} onChange={onChange} type="text" placeholder='City' className='w-full border border-gray-300 rounded-md p-2 outline-none' />
            <input name="state" value={form.state} onChange={onChange} type="text" placeholder='State' className='w-full border border-gray-300 rounded-md p-2 outline-none' />
          </div>

          <div className='flex gap-3'>
            <input name="zipcode" value={form.zipcode} onChange={onChange} type="text" placeholder='Zipcode' className='w-full border border-gray-300 rounded-md p-2 outline-none' />
            <input name="country" value={form.country} onChange={onChange} type="text" placeholder='Country' className='w-full border border-gray-300 rounded-md p-2 outline-none' />
          </div>

          <input name="phone" value={form.phone} onChange={onChange} type="tel" placeholder='Phone Number' className='w-full border border-gray-300 rounded-md p-2 outline-none' />

          {error && (
            <p className='text-sm text-red-600'>{error}</p>
          )}
        </form>

      </div>

      {/* ---------Right side ---------*/}
      <div className='w-full sm:max-w-[420px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'CART'} text2={'TOTALS'} />
        </div>

        <div className='flex flex-col gap-2 text-gray-700 border border-gray-200 rounded-md p-4'>
          <div className='flex justify-between py-2 border-b'>
            <p>Subtotal</p>
            <p>{currency}{subtotal.toFixed(2)}</p>
          </div>
          <div className='flex justify-between py-2 border-b'>
            <p>Shipping Fee</p>
            <p>{currency}{shipping.toFixed(2)}</p>
          </div>
          <div className='flex justify-between py-2'>
            <p className='font-semibold'>Total</p>
            <p className='font-semibold'>{currency}{total.toFixed(2)}</p>
          </div>
        </div>

        <div className='text-xl sm:text-2xl my-6'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>

        <div className='flex flex-col gap-3'>
          <button
            type="button"
            onClick={() => setMethod('stripe')}
            className='flex items-center justify-between gap-4 border border-gray-300 rounded-md px-4 py-3 hover:border-gray-400'
          >
            <div className='flex items-center gap-3'>
              <span className={`w-3 h-3 rounded-full border ${method === 'stripe' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`} />
              <p className='text-sm font-medium text-gray-700'>Stripe</p>
            </div>
            <img src={assets.stripe_logo} alt="Stripe" className='h-5 object-contain' />
          </button>

          <button
            type="button"
            onClick={() => setMethod('razorpay')}
            className='flex items-center justify-between gap-4 border border-gray-300 rounded-md px-4 py-3 hover:border-gray-400'
          >
            <div className='flex items-center gap-3'>
              <span className={`w-3 h-3 rounded-full border ${method === 'razorpay' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`} />
              <p className='text-sm font-medium text-gray-700'>Razorpay</p>
            </div>
            <img src={assets.razorpay_logo} alt="Razorpay" className='h-5 object-contain' />
          </button>

          <button
            type="button"
            onClick={() => setMethod('cod')}
            className='flex items-center justify-between gap-4 border border-gray-300 rounded-md px-4 py-3 hover:border-gray-400'
          >
            <div className='flex items-center gap-3'>
              <span className={`w-3 h-3 rounded-full border ${method === 'cod' ? 'bg-green-500 border-green-500' : 'border-gray-400'}`} />
              <p className='text-sm font-medium text-gray-700'>Cash On Delivery</p>
            </div>
            <p className='text-xs text-gray-500 font-medium'>COD</p>
          </button>
        </div>

        <button
          type="button"
          disabled={subtotal === 0}
          onClick={handlePlaceOrder}
          className='w-full bg-black text-white py-3 text-sm font-medium mt-6 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  )
}

export default PlaceOrder
