import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()
const TOKEN_KEY = 'mock_jwt'
const USER_KEY = 'user_info'

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if(token){
      localStorage.setItem(TOKEN_KEY, token)
    } else {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
      setUser(null)
    }
  }, [token])

  useEffect(() => {
    if(user) localStorage.setItem(USER_KEY, JSON.stringify(user))
  }, [user])

  const login = (username, password) => {
    if(!username.trim()) return { ok: false, message: 'Username required' }
    if(password === 'test123'){
      const mock = 'jwt-' + btoa(username + ':' + Date.now())
      setToken(mock)
      setUser({ username })
      return { ok: true }
    }
    return { ok: false, message: 'Invalid password' }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)