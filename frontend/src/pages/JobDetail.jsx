import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../utils/api'
import Navbar from '../components/Navbar'

function JobDetail() {
    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await API.get(`/jobs/${id}`)
                setJob(res.data)
            } catch (err) {
                setError('Job not found')
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [id])

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 pt-10">
                {loading && <p className="text-gray-500 text-center">Loading...</p>}
                {error && <p className="text-red-400 text-center">{error}</p>}

                {job && (
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
                                <p className="text-purple-600 font-medium mt-1">{job.postedBy?.name}</p>
                            </div>
                            <span className="bg-purple-100 text-purple-600 text-sm px-4 py-1 rounded-full">
                                {job.category}
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">💰 {job.ctc}</span>
                            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">📍 {job.jobLocation}</span>
                            <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">🎯 Drive: {job.driveLocation}</span>
                            <span className="bg-blue-50 text-blue-600 text-sm px-3 py-1 rounded-full">💼 {job.jobType === 'fulltime' ? 'Full Time' : job.jobType === 'internship' ? 'Internship' : 'Part Time'}</span>
                        </div>

                        <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                        
                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                            <span className="text-green-500 font-medium">✅ {job.vacancies} Vacancies</span>
                            <span className="text-gray-400">👥 {job.applicantCount} Applied</span>
                            <span className="text-red-400 text-sm">🗓️ Last date: {new Date(job.lastDateToApply).toLocaleDateString()}</span>
                        </div>
                    </div>    
                )}
            </div>
        </div>
    )
}

export default JobDetail