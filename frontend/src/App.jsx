import { BrowserRouter , Routes , Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'

function Layout() {
  const location = useLocation()
  const hideNavbar = ['/login', '/signup'].includes(location.pathname)
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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