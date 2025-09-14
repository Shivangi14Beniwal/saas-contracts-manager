import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContractsTable({ data, loading, error }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [riskFilter, setRiskFilter] = useState('All')
  const [page, setPage] = useState(1)
  const perPage = 10

  const filtered = useMemo(() => {
    let items = data || []
    if (search) {
      const q = search.toLowerCase()
      items = items.filter(i => i.name.toLowerCase().includes(q) || i.parties.toLowerCase().includes(q))
    }
    if (statusFilter !== 'All') items = items.filter(i => i.status === statusFilter)
    if (riskFilter !== 'All') items = items.filter(i => i.risk === riskFilter)
    return items
  }, [data, search, statusFilter, riskFilter])

  const total = filtered.length
  const pages = Math.max(1, Math.ceil(total / perPage))
  const pageData = filtered.slice((page - 1) * perPage, page * perPage)

  const riskClass = (r) => r === 'High' ? 'text-red-400' : r === 'Medium' ? 'text-yellow-400' : 'text-green-400'

  return (
    <div>
      <div className='flex items-center gap-3 mb-4'>
        <input placeholder='Search by name or parties'
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          className='border border-orange-400 bg-transparent text-white p-2 rounded w-1/3' />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className='border border-orange-400 bg-transparent text-white p-2 rounded'>
          <option>All</option>
          <option>Active</option>
          <option>Expired</option>
          <option>Renewal Due</option>
        </select>
        <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}
          className='border border-orange-400 bg-transparent text-white p-2 rounded'>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      {loading && <div className='p-6 text-center'>Loading...</div>}
      {error && <div className='p-6 text-center text-red-400'>{error}</div>}
      {!loading && !error && pageData.length === 0 && <div className='p-6 text-center text-gray-400'>No contracts yet.</div>}

      {!loading && !error && pageData.length > 0 && (
        <div className='bg-transparent border border-orange-400 rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.4)] overflow-x-auto'>
          <table className='min-w-full text-white'>
            <thead className='bg-transparent'>
              <tr>
                <th className='p-3 text-left'>Contract Name</th>
                <th className='p-3 text-left'>Parties</th>
                <th className='p-3 text-left'>Expiry</th>
                <th className='p-3 text-left'>Status</th>
                <th className='p-3 text-left'>Risk</th>
                <th className='p-3 text-left'>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map(row => (
                <tr key={row.id} className='border-t border-orange-400'>
                  <td className='p-3'>{row.name}</td>
                  <td className='p-3'>{row.parties}</td>
                  <td className='p-3'>{row.expiry}</td>
                  <td className='p-3'>{row.status}</td>
                  <td className={`p-3 ${riskClass(row.risk)}`}>{row.risk}</td>
                  <td className='p-3'>
                    <Link to={`/contracts/${row.id}`} className='text-orange-400 hover:underline'>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className='flex items-center justify-between mt-4 text-gray-300'>
        <div className='text-sm'>{total} contracts</div>
        <div className='space-x-2'>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} className='px-3 py-1 border border-orange-400 rounded'>Prev</button>
          <span>{page}/{pages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, pages))} className='px-3 py-1 border border-orange-400 rounded'>Next</button>
        </div>
      </div>
    </div>
  )
}