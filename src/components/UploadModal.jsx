import React, { useState } from 'react'

export default function UploadModal({ onClose }) {
  const [files, setFiles] = useState([])
  const [successMsg, setSuccessMsg] = useState('')

  const handleFiles = (fileList) => {
    const arr = Array.from(fileList).map(f => ({ name: f.name, status: 'Uploading' }))
    setFiles(prev => [...prev, ...arr])
    // simulate upload -> always success
    arr.forEach((f, idx) => {
      setTimeout(() => {
        setFiles(current => current.map(c => c.name === f.name ? { ...c, status: 'Success' } : c))
        // if last file, show success message
        if (idx === arr.length - 1) {
          setTimeout(() => {
            setSuccessMsg(`${arr.length} file(s) uploaded successfully`)
          }, 300)
        }
      }, 800 + idx * 400)
    })
  }

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h3 className='font-semibold mb-4 text-white text-lg'>Upload Files</h3>
        
        <div className='border-dashed border-2 border-white/30 bg-white/5 p-6 rounded-xl text-center backdrop-blur-sm'>
          <input 
            type='file' 
            multiple 
            onChange={e => handleFiles(e.target.files)}
            className='mb-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600'
          />
          <p className='text-sm text-white/70 mt-2'>Drag & drop or browse files</p>
        </div>

        <div className='mt-4 space-y-2 max-h-32 overflow-auto'>
          {files.map(f => (
            <div key={f.name} className='flex justify-between items-center p-2 bg-white/5 rounded-lg'>
              <div className='text-white text-sm'>{f.name}</div>
              <div className={`text-sm ${f.status === 'Success' ? 'text-green-400' : 'text-yellow-400'}`}>
                {f.status}
              </div>
            </div>
          ))}
        </div>

        {successMsg && (
          <div className='mt-3 text-green-400 text-sm bg-green-500/10 p-2 rounded-lg border border-green-500/20'>
            {successMsg}
          </div>
        )}

        <div className='flex justify-end gap-3 mt-6'>
          <button 
            onClick={onClose} 
            className='px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all duration-200'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}