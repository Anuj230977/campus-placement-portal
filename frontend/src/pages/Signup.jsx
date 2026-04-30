import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../utils/api'
import AnimatedBackground from '../components/AnimatedBackground'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('student')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await API.post('/auth/signup', { name,email, password, role })
            navigate('/login')
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed')
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
                    Create Account
                </h3>

                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label className="block text-white/80 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 placeholder-white/40 focus:outline-none focus:border-purple-400"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div className='mb-4'>
                        <label className="block text-white/80 mb-1">Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className= "w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 placeholder-white/40 focus:outline-none focus:border-purple-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-white/80 mb-1">Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 placeholder-white/40 focus:outline-none focus:border-purple-400"
                            placeholder="enter your password"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-white/80 mb-1">I am a</label>
                        <select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-purple-400">
                            <option value="student" className="text-black">Student</option>
                            <option value="company" className="text-black">Company</option>
                        </select>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm mb-3">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold disabled:opacity-50">
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                </form>
            </div>
        </AnimatedBackground>
    )
}

export default Signup