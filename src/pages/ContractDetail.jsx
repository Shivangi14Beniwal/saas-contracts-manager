import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function ContractDetail() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openEvidence, setOpenEvidence] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        // Mock data - replace this with your actual API call when backend is ready
        const mockData = {
          name: "Software Development Contract",
          parties: "TechCorp Ltd & DevSolutions Inc",
          start: "2024-01-15",
          expiry: "2025-01-15",
          status: "Active",
          risk: "Medium",
          clauses: [
            {
              title: "Payment Terms",
              summary: "Payment due within 30 days of invoice",
              confidence: 0.95
            },
            {
              title: "Termination Clause",
              summary: "Either party can terminate with 30 days notice",
              confidence: 0.88
            },
            {
              title: "Intellectual Property",
              summary: "All developed IP belongs to client",
              confidence: 0.92
            },
            {
              title: "Confidentiality",
              summary: "Non-disclosure agreement for 5 years",
              confidence: 0.90
            }
          ],
          insights: [
            {
              message: "Contract has favorable payment terms",
              risk: "Low"
            },
            {
              message: "Termination clause may need review",
              risk: "Medium"
            },
            {
              message: "IP ownership clearly defined",
              risk: "Low"
            }
          ],
          evidence: [
            {
              source: "Section 3.1 - Payment Terms",
              snippet: "Payment shall be made within thirty (30) days of receipt of invoice...",
              relevance: 0.94
            },
            {
              source: "Section 7.2 - Termination",
              snippet: "Either party may terminate this agreement by providing thirty (30) days written notice...",
              relevance: 0.87
            },
            {
              source: "Section 5.1 - Intellectual Property",
              snippet: "All intellectual property developed under this contract shall be the exclusive property of the Client...",
              relevance: 0.91
            }
          ]
        }

        // Simulate API delay
        setTimeout(() => {
          setData(mockData)
          setLoading(false)
        }, 1000)

        // When your backend is ready, replace above code with:
        // const res = await axios.get(`http://127.0.0.1:8009/contracts/${id}`)
        // setData(res.data)
        // setLoading(false)

      } catch (e) {
        setError('Failed to load contract data')
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return (
    <div className='min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-600 flex items-center justify-center'>
      <div className='text-white text-lg flex items-center gap-3'>
        <div className='w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
        Loading contract details...
      </div>
    </div>
  )

  if (error) return (
    <div className='min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-600 flex items-center justify-center'>
      <div className='text-center'>
        <div className='text-red-400 text-lg mb-4'>{error}</div>
        <Link to='/' className='text-orange-400 hover:text-orange-300'>
          ← Go back to contracts
        </Link>
      </div>
    </div>
  )

  if (!data) return (
    <div className='min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-600 flex items-center justify-center'>
      <div className='text-white text-lg'>No contract data found</div>
    </div>
  )

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-black via-blue-900 to-orange-600'>
      <Sidebar />
      <div className='flex-1'>
        <Topbar />
        <div className='p-6'>
          <Link to='/' className='text-orange-400 hover:text-orange-300 text-sm mb-4 inline-block'>
            ← Back to Contracts
          </Link>

          <div className='card mt-3'>
            <h2 className='text-2xl font-semibold text-white mb-2'>{data.name}</h2>
            <p className='text-white/70 mb-4'>{data.parties}</p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Start Date</div>
                <div className='text-white font-medium'>{data.start}</div>
              </div>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Expiry Date</div>
                <div className='text-white font-medium'>{data.expiry}</div>
              </div>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Status</div>
                <div className='text-white font-medium'>{data.status}</div>
              </div>
              <div className='bg-white/5 p-3 rounded-lg'>
                <div className='text-white/60 text-sm'>Risk Level</div>
                <div className={`font-medium ${data.risk === 'High' ? 'text-red-400' : data.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {data.risk}
                </div>
              </div>
            </div>

            <section className='mb-6'>
              <h3 className='font-semibold mb-3 text-white text-lg'>Contract Clauses</h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {data.clauses.map((c, index) => (
                  <div key={index} className='bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors'>
                    <div className='font-semibold text-white mb-2'>{c.title}</div>
                    <div className='text-white/70 text-sm mb-2'>{c.summary}</div>
                    <div className='text-white/60 text-xs'>
                      Confidence: {(c.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className='mb-6'>
              <h3 className='font-semibold mb-3 text-white text-lg'>AI Risk Insights</h3>
              <div className='space-y-3'>
                {data.insights.map((i, idx) => (
                  <div key={idx} className='bg-white/5 border border-white/10 p-4 rounded-lg flex justify-between items-center hover:bg-white/10 transition-colors'>
                    <div className='text-white'>{i.message}</div>
                    <div className={`font-medium px-3 py-1 rounded-full text-sm ${i.risk === 'High' ? 'text-red-400 bg-red-400/20' : i.risk === 'Medium' ? 'text-yellow-400 bg-yellow-400/20' : 'text-green-400 bg-green-400/20'}`}>
                      {i.risk} Risk
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className='mb-6'>
              <h3 className='font-semibold mb-3 text-white text-lg'>Supporting Evidence</h3>
              <div>
                <button
                  onClick={() => setOpenEvidence(!openEvidence)}
                  className='bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors mb-3'
                >
                  {openEvidence ? 'Hide Evidence' : 'Show Evidence'}
                </button>

                {openEvidence && (
                  <div className='bg-white/5 border border-white/10 rounded-lg p-4'>
                    <div className='text-white/60 text-sm mb-3'>Found {data.evidence.length} relevant evidence items:</div>
                    {data.evidence.map((e, i) => (
                      <div key={i} className='mb-4 pb-4 border-b border-white/10 last:border-b-0'>
                        <div className='text-white font-medium text-sm mb-2'>{e.source}</div>
                        <div className='text-white/80 text-sm mb-2 italic'>"{e.snippet}"</div>
                        <div className='text-white/60 text-xs'>
                          Relevance Score: {(e.relevance * 100).toFixed(0)}%
                        </div>
                      </div>
                    ))}
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