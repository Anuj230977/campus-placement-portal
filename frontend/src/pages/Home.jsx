import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'
import Navbar from '../components/Navbar'

function Home() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get('/jobs')
                setJobs(res.data)
            } catch (err) {
                setError('Failed to load jobs')
            } finally {
                setLoading(false)
            }
        }

        fetchJobs()
    }, [])

    return (
        <div className="min-h-screen bg-slate-100">
            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Available Jobs
                </h1>
                <p className="text-gray-500 mb-8">
                    Find your dream job and apply today!
                </p>

                {loading && (
                    <p className="text-gray-500 text-center">Loading jobs...</p>
                )}

                {error && (
                    <p className="text-red-400 text-center">{error}</p>
                )}

                {!loading && !error && jobs.length === 0 && (
                    <p className="text-gray-500 text-center">No jobs available right now.</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl cursor-pointer transition duration-300 hover:-translate-y-1"
                            onClick={() => navigate(`/jobs/${job._id}`)}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h2 className="text-gray-800 font-bold text-xl">{job.title}</h2>
                                    <p className="text-purple-600 text-sm font-medium mt-0.5">{job.postedBy?.name}</p>
                                </div>
                                <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                                    {job.category}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">💰 {job.ctc}</span>
                                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">📍 {job.jobLocation}</span>
                                <span className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                                    {job.jobType === 'fulltime' ? '💼 Full Time' : job.jobType === 'internship' ? '📚 Internship' : '⏰ Part Time'}
                                </span>
                            </div>

                            <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                                <div>
                                    <span className="text-green-500 font-medium text-sm">✅ {job.vacancies} Vacancies</span>
                                    <p className="text-red-400 text-xs mt-1">🗓️ Last date: {new Date(job.lastDateToApply).toLocaleDateString()}</p>
                                </div>
                                <span className="text-gray-400 text-sm">👥 {job.applicantCount} Applied</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home