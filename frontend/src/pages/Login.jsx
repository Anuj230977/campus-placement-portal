import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await API.post('/auth/login', { email, password })
            login(
                { name: res.data.name, role: res.data.role },
                res.data.token
            )

            if (res.data.role === 'student') {
                navigate('/student/dashboard')
            } else {
                navigate('/company/dashboard')
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                    Campus Placement Portal
                </h2>
                <h3 className="text-lg font-semibold text-center text-gray-700 mb-4">
                    Login
                </h3>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-3">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

            </div>
        </div>
    )
}
export default Login