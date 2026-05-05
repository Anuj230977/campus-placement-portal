import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'
import Navbar from '../components/Navbar'

function StudentDashboard() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [applications, setApplications] = useState([])
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        const fetchData = async () => {
            try {
                const [appsRes, profileRes] = await Promise.all([
                    API.get('/applications/my'),
                    API.get('/profile/me')
                ])
                setApplications(appsRes.data)
                setProfile(profileRes.data)
            } catch (err) {
                setError('failed to load dashboard data')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [user, navigate])

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Welcome, {user.name}!</h1>

                
            </div>
        </div>
    )
}

export default StudentDashboard