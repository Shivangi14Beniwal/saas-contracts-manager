import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ isOpen, onClose }) {
  const nav = [
    { to: '/', label: 'Contracts' },
    { to: '/insights', label: 'Insights' },
    { to: '/reports', label: 'Reports' },
    { to: '/settings', label: 'Settings' }
  ]

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                    md:translate-x-0 md:static md:block`}>
      
      {/* Sidebar container with original styling */}
      <div className='sidebar bg-white/10 backdrop-blur-lg border-r border-white/10 min-h-screen p-4'>

        {/* Mobile close button */}
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={onClose} className="text-white text-xl">×</button>
        </div>

        <h3 className='font-bold mb-6 text-white text-xl border-b border-white/10 pb-3'>Dashboard</h3>

        <nav className='space-y-1'>
          {nav.map(n => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                isActive
                  ? 'sidebar-item active flex items-center space-x-3'
                  : 'sidebar-item flex items-center space-x-3'
              }
              onClick={onClose}
            >
              <span>{n.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}