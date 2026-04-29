import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<h1>Signup Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App