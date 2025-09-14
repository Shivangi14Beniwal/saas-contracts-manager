import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import ContractsTable from '../components/ContractsTable'
import UploadModal from '../components/UploadModal'
import AddContractModal from '../components/AddContractModal'
import { useContracts } from '../contexts/ContractsContext'

export default function Dashboard() {
  const { contracts, loading, error, setContracts } = useContracts()
  const [showUpload, setShowUpload] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleAddContract = (newContract) => {
    setContracts(prev => [...prev, { ...newContract, id: 'c' + (prev.length + 1) }])
    setShowAdd(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-500'>
      <div className='flex flex-col md:flex-row'>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className='flex-1'>
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <div className='px-4 py-6 sm:px-6'>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 sm:p-6 border border-white/20">
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6'>
                <h1 className='text-2xl sm:text-3xl font-bold text-white drop-shadow-lg'>
                  Contracts
                </h1>

                <div className='flex flex-col sm:flex-row gap-3'>
                  <button 
                    onClick={() => setShowAdd(true)}
                    className='px-5 py-3 rounded-xl font-semibold shadow-md
                               bg-gradient-to-r from-blue-800 to-orange-500
                               hover:from-blue-900 hover:to-blue-500
                               text-white transition-all duration-300
                               hover:opacity-90 transform hover:scale-105'
                  >
                    + Add Contract
                  </button>

                  <button 
                    onClick={() => setShowUpload(true)}
                    className='px-5 py-3 rounded-xl font-semibold shadow-md
                               bg-gradient-to-r from-blue-800 to-orange-500
                               hover:from-blue-900 hover:to-orange-200
                               text-white transition-all duration-300
                               hover:opacity-90 transform hover:scale-105'
                  >
                    Upload File
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto rounded-lg">
                <ContractsTable data={contracts} loading={loading} error={error} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
      {showAdd && <AddContractModal onClose={() => setShowAdd(false)} onAdd={handleAddContract} />}
    </div>
  )
}