import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-xl font-bold text-gray-800">FinanceTracker</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                isActive 
                  ? "text-gray-900 font-bold underline px-3 py-2 rounded-md" 
                  : "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              }
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/converter"
              className={({ isActive }) => 
                isActive 
                  ? "text-gray-900 font-bold underline px-3 py-2 rounded-md" 
                  : "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              }
            >
              Converter
            </NavLink>
            <NavLink 
              to="/insights"
              className={({ isActive }) => 
                isActive 
                  ? "text-gray-900 font-bold underline px-3 py-2 rounded-md" 
                  : "text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              }
            >
              Insights
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive 
                  ? "block text-gray-900 font-bold underline px-3 py-2 rounded-md" 
                  : "block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/converter"
              className={({ isActive }) => 
                isActive 
                  ? "block text-gray-900 font-bold underline px-3 py-2 rounded-md" 
                  : "block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              }
            >
              Converter
            </NavLink>
            <NavLink
              to="/insights"
              className={({ isActive }) => 
                isActive 
                  ? "block text-gray-900 font-bold underline px-3 py-2 rounded-md" 
                  : "block text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
              }
            >
              Insights
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar