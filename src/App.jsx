import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ContractDetail from './pages/ContractDetail'
import { useAuth } from './contexts/AuthContext'

export default function App(){
  const { token } = useAuth()
  return (
    <Routes>
      <Route path='/login' element={<Login/>} />
      <Route path='/' element={ token ? <Dashboard/> : <Navigate to='/login' /> } />
      <Route path='/contracts/:id' element={ token ? <ContractDetail/> : <Navigate to='/login' /> } />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
