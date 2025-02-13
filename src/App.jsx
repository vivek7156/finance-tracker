import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import CoversionPage from './pages/converter/ConversionPage'
import InsightsPage from './pages/insights/InsightsPage'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/converter" element={<CoversionPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App