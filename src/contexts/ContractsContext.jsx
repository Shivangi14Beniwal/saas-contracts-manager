import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const ContractsContext = createContext()

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchContracts = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axios.get('/contracts.json')
      setContracts(res.data)
    } catch (err) {
      setError('Failed to load contracts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContracts()
  }, [])

  return (
    <ContractsContext.Provider value={{ contracts, setContracts, loading, error, fetchContracts }}>
      {children}
    </ContractsContext.Provider>
  )
}

export const useContracts = () => useContext(ContractsContext)