import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import API from '../utils/api'
import AnimatedBackground from '../components/AnimatedBackground'

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
        <AnimatedBackground>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-white mb-2">
                    Campus Placement Portal
                </h2>
                <h3 className="text-lg font-semibold text-center text-white/70 mb-6">
                    Login
                </h3>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-white/80 mb-1">Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 placeholder-white/40 focus:outline-none focus:border-purple-400"
                            placeholder="enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white/80 mb-1">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/10 border-white/20 text-white rounded-lg px-3 py-2 placeholder-white/40 focus:outline-none focus:border-purple-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm mb-3">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

            </div>
        </AnimatedBackground>
    )
}
export default Login