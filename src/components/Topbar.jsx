import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Topbar({ onMenuClick }) {
  const { logout, user } = useAuth()

  return (
    <div className='flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border-b border-white/10'>

      {/* Left: Hamburger (mobile only) */}
      <div className='md:hidden'>
        <button onClick={onMenuClick} className='text-white'>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' strokeWidth='2' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </button>
      </div>

      {/* Right: Username + Logout */}
      <div className='flex items-center gap-4 ml-auto'>
        <div className='text-sm text-white font-medium'>
          {user?.username || 'User'}
        </div>
        <button 
          onClick={logout} 
          className='text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all duration-200 hover:scale-105'
        >
          Logout
        </button>
      </div>
    </div>
  )
}