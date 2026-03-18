import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(ShopContext)

  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isLogin && !form.name.trim()) {
      setError('Please enter your name.')
      return
    }
    if (!form.email.trim()) {
      setError('Please enter your email.')
      return
    }
    if (!form.password.trim()) {
      setError('Please enter your password.')
      return
    }

    // Demo auth: store user locally
    setUser({ name: form.name || 'User', email: form.email })
    navigate('/')
  }

  return (
    <div className='border-t pt-14 min-h-[80vh] flex items-start justify-center'>
      <div className='w-full max-w-[420px] border border-gray-200 rounded-md p-6'>
        <div className='text-2xl mb-4'>
          <Title text1={isLogin ? 'LOGIN' : 'CREATE'} text2={isLogin ? 'ACCOUNT' : 'ACCOUNT'} />
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          {!isLogin && (
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              type="text"
              placeholder='Name'
              className='w-full border border-gray-300 rounded-md p-2 outline-none'
            />
          )}

          <input
            name="email"
            value={form.email}
            onChange={onChange}
            type="email"
            placeholder='Email'
            className='w-full border border-gray-300 rounded-md p-2 outline-none'
          />

          <input
            name="password"
            value={form.password}
            onChange={onChange}
            type="password"
            placeholder='Password'
            className='w-full border border-gray-300 rounded-md p-2 outline-none'
          />

          <div className='flex justify-between items-center text-sm text-gray-600'>
            <button type="button" className='hover:underline' onClick={() => setError('Password reset is not implemented yet.')}>
              Forgot your password?
            </button>
            {isLogin ? (
              <button type="button" className='hover:underline' onClick={() => { setIsLogin(false); setError('') }}>
                Create account
              </button>
            ) : (
              <button type="button" className='hover:underline' onClick={() => { setIsLogin(true); setError('') }}>
                Login here
              </button>
            )}
          </div>

          {error && (
            <p className='text-sm text-red-600'>{error}</p>
          )}

          <button className='w-full bg-black text-white py-3 text-sm font-medium hover:bg-gray-800 transition'>
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
