import React, { createContext, useContext, useState, useEffect } from 'react'

const ContractsContext = createContext()

// Static data fallback
const staticContracts = [
  {
    id: "c1",
    name: "Software Development Agreement",
    parties: "TechCorp & DevSolutions", 
    expiry: "2025-01-16",
    status: "Active",
    risk: "Low"
  },
  {
    id: "c2", 
    name: "Marketing Services Contract",
    parties: "BrandCorp & AdAgency",
    expiry: "2024-12-31", 
    status: "Active",
    risk: "Medium"
  },
  {
    id: "c3",
    name: "Data Processing Agreement", 
    parties: "DataCorp & ProcessingInc",
    expiry: "2024-05-31",
    status: "Expired", 
    risk: "High"
  }
]

export const ContractsProvider = ({ children }) => {
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(false) // Set to false for demo
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadContracts = () => {
      setLoading(true)
      
      // Simulate loading delay
      setTimeout(() => {
        console.log('Loading static contracts...')
        setContracts(staticContracts)
        setLoading(false)
        setError(null)
      }, 500)
    }
    
    loadContracts()
  }, [])

  const addContract = (newContract) => {
    const contractWithId = {
      ...newContract,
      id: `c${contracts.length + 1}`
    }
    setContracts(prev => [...prev, contractWithId])
  }

  return (
    <ContractsContext.Provider value={{
      contracts,
      setContracts,
      addContract,
      loading,
      error,
      refetch: () => window.location.reload()
    }}>
      {children}
    </ContractsContext.Provider>
  )
}

export const useContracts = () => useContext(ContractsContext)