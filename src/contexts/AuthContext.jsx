import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('mock_jwt'))
  const [user, setUser] = useState(() => {
    // localStorage se user info retrieve karo
    const savedUser = localStorage.getItem('user_info')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if(token) {
      localStorage.setItem('mock_jwt', token)
    } else {
      localStorage.removeItem('mock_jwt')
      localStorage.removeItem('user_info') // token nahi hai toh user info bhi clear karo
      setUser(null)
    }
  }, [token])

  useEffect(() => {
    // user info ko localStorage mein save karo
    if(user) {
      localStorage.setItem('user_info', JSON.stringify(user))
    }
  }, [user])

  const login = (username, password) => {
    if(password === 'test123'){
      const mock = 'jwt-' + btoa(username + ':' + Date.now())
      setToken(mock)
      setUser({ username: username }) // username store karo
      return { ok: true }
    }
    return { ok: false, message: 'Invalid password' }
  }

  const logout = () => {
    setToken(null)
    setUser(null) // user info clear karo
  }

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, // user ko context mein add karo
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)