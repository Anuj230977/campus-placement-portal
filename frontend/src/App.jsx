import { BrowserRouter , Routes , Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import JobDetail from './pages/JobDetail'
import StudentDashboard from './pages/StudentDashboard'

function Layout() {
  const location = useLocation()
  const hideNavbar = ['/login', '/signup'].includes(location.pathname)
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />  
    </BrowserRouter>
  )
}

export default App