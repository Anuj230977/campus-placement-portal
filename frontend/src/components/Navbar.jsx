import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">

            <Link to="/" className="text-purple-600 font-bold text-xl drop-shadow-lg tracking-wide">
                🎓 Campus Portal
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="text-gray-600 text-sm">
                            Hi, {user.name}!
                        </span>
                        {user.role === 'student' && (
                            <Link to="/student/dashboard" className="text-gray-600 hover:text-purple-600">
                                Dashboard
                            </Link>
                        )}
                        {user.role === 'company' && (
                            <Link to="/company/dashboard" className="text-white hover:text-purple-300">
                                Dashboard
                            </Link>
                        )}
                        <button 
                            onClick={handleLogout}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm">
                                Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to ="/login" className="text-gray-600 hover:text-purple-600">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar