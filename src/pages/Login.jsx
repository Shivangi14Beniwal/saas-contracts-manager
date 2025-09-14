import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [err, setErr] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    const res = login(username, password)
    if(res.ok){
      navigate('/')
    } else {
      setErr(res.message || 'Login failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900 to-orange-600'>
      <div className='bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20'>
        <h2 className='text-3xl font-bold mb-2 text-white text-center drop-shadow-lg'>
          SaaS Contracts
        </h2>
        <p className='text-white/70 text-center mb-6'>Dashboard Login</p>
        
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-white mb-2'>Username</label>
            <input 
              className='input-field' 
              placeholder='Enter your username'
              value={username} 
              onChange={e=>setUsername(e.target.value)} 
              required 
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-white mb-2'>Password</label>
            <div className='relative'>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className='input-field pr-12'
                placeholder='Enter your password'
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                required 
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200'
              >
                {showPassword ? (
                  // Eye slash icon (hide password)
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                  </svg>
                ) : (
                  // Eye icon (show password)
                  <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                  </svg>
                )}
              </button>
            </div>
            <p className='text-white/60 text-xs mt-2'>
              Use password <strong className='text-white'>test123</strong> to login.
            </p>
          </div>
          
          {err && (
            <div className='bg-red-500/20 border border-red-400/30 rounded-lg p-3'>
              <p className='text-red-300 text-sm'>{err}</p>
            </div>
          )}
          
          <button 
            type='submit'
            className='w-full px-6 py-3 rounded-xl font-semibold shadow-md
                     bg-gradient-to-r from-blue-800 to-blue-400
                     hover:from-blue-900 hover:to-blue-500
                     text-white transition-all duration-300
                     hover:opacity-90 transform hover:scale-105'
          >
            Login
          </button>
        </form>
        
        <div className='mt-6 text-center'>
          <p className='text-white/50 text-xs'>
            Secure login powered by modern authentication
          </p>
        </div>
      </div>
    </div>
  )
}