import React, { useState } from 'react'

export default function AddContractModal({ onClose, onAdd }) {
  const [name, setName] = useState('')
  const [parties, setParties] = useState('')
  const [expiry, setExpiry] = useState('')
  const [status, setStatus] = useState('Active')
  const [risk, setRisk] = useState('Low')
  const [err, setErr] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !parties.trim() || !expiry.trim()) {
      setErr('Please fill name, parties and expiry')
      return
    }
    const newContract = { name, parties, expiry, status, risk }
    onAdd && onAdd(newContract)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded shadow w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-3">Add New Contract</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Contract Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">Parties</label>
            <input value={parties} onChange={e=>setParties(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm">Expiry Date</label>
            <input value={expiry} onChange={e=>setExpiry(e.target.value)} placeholder="YYYY-MM-DD" className="mt-1 w-full border rounded px-2 py-1" />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm">Status</label>
              <select value={status} onChange={e=>setStatus(e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
                <option>Active</option>
                <option>Expired</option>
                <option>Renewal Due</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm">Risk</label>
              <select value={risk} onChange={e=>setRisk(e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {err && <div className="text-red-600 text-sm">{err}</div>}

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" onClick={onClose} className="px-3 py-1 border rounded">Cancel</button>
            <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  )
}