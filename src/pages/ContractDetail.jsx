import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function ContractDetail(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openEvidence, setOpenEvidence] = useState(false)

  useEffect(()=>{
    const fetch = async ()=>{
      setLoading(true)
      try{
        const res = await axios.get('/contracts.json')
        const found = res.data.find(c=>c.id === id)
        // if detail not in list, mock a detailed payload
        if(found){
          // fetch detailed data from a mock mapping
          // For demo, create inline
          setData({
            id: found.id,
            name: found.name,
            parties: found.parties,
            start: '2023-01-01',
            expiry: found.expiry,
            status: found.status,
            risk: found.risk,
            clauses: [
              { title: 'Termination', summary: '90 days notice period.', confidence: 0.82 },
              { title: 'Liability Cap', summary: '12 months fees limit.', confidence: 0.87 }
            ],
            insights: [
              { risk: 'High', message: 'Liability cap excludes data breach costs.'},
              { risk: 'Medium', message: 'Renewal auto-renews unless cancelled 60 days before expiry.'}
            ],
            evidence: [
              { source: 'Section 12.2', snippet: "Total liability limited to 12 months' fees.", relevance: 0.91 }
            ]
          })
        } else {
          setError('Contract not found')
        }
      }catch(e){
        setError('Failed to load')
      }finally{
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if(loading) return (
    <div className='min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-600 flex items-center justify-center'>
      <div className='text-white text-lg'>Loading...</div>
    </div>
  )
  
  if(error) return (
    <div className='min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-600 flex items-center justify-center'>
      <div className='text-red-400 text-lg'>{error}</div>
    </div>
  )

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-600'>
      <Sidebar />
      <div className='flex-1'>
        <Topbar />
        <div className='p-6'>
          <Link to='/' className='text-orange-400 hover:text-orange-300 text-sm mb-4 inline-block'>
            ← Back
          </Link>
          
          <div className='card mt-3'>
            <h2 className='text-2xl font-semibold text-white mb-2'>{data.name}</h2>
            <p className='text-white/70 mb-4'>{data.parties}</p>
            
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Start</div>
                <div className='text-white font-medium'>{data.start}</div>
              </div>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Expiry</div>
                <div className='text-white font-medium'>{data.expiry}</div>
              </div>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Status</div>
                <div className='text-white font-medium'>{data.status}</div>
              </div>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Risk</div>
                <div className={`font-medium ${data.risk === 'High' ? 'text-red-400' : data.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {data.risk}
                </div>
              </div>
            </div>

            <section className='mb-6'>
              <h3 className='font-semibold mb-3 text-white text-lg'>Clauses</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {data.clauses.map(c=>(
                  <div key={c.title} className='bg-white/5 border border-white/10 p-4 rounded-lg'>
                    <div className='font-semibold text-white mb-2'>{c.title}</div>
                    <div className='text-white/70 text-sm mb-2'>{c.summary}</div>
                    <div className='text-white/60 text-xs'>
                      Confidence: {(c.confidence*100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className='mb-6'>
              <h3 className='font-semibold mb-3 text-white text-lg'>AI Insights</h3>
              <div className='space-y-3'>
                {data.insights.map((i,idx)=>(
                  <div key={idx} className='bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center'>
                    <div className='text-white'>{i.message}</div>
                    <div className={`font-medium ${i.risk==='High' ? 'text-red-400' : i.risk==='Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {i.risk}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className='mb-6'>
              <h3 className='font-semibold mb-3 text-white text-lg'>Evidence</h3>
              <div>
                <button 
                  onClick={()=>setOpenEvidence(true)} 
                  className='btn-secondary mb-3'
                >
                  Open Evidence Panel
                </button>
                
                {openEvidence && (
                  <div className='bg-white/5 border border-white/10 rounded-lg p-4'>
                    {data.evidence.map((e,i)=>(
                      <div key={i} className='mb-3 pb-3 border-b border-white/10 last:border-b-0'>
                        <div className='text-white font-medium text-sm mb-1'>{e.source}</div>
                        <div className='text-white/80 text-sm mb-1'>{e.snippet}</div>
                        <div className='text-white/60 text-xs'>
                          Relevance: {(e.relevance*100).toFixed(0)}%
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={()=>setOpenEvidence(false)} 
                      className='mt-3 px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-200'
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}