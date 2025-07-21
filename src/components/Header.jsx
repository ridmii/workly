import { NavLink, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { WorkshopContext } from "../context/WorkshopContext.jsx";

function Header() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(WorkshopContext) || {};
  const { theme, toggleTheme } = useContext(ThemeContext) || {};
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-[#1A2526] p-4 shadow-md fixed w-full top-0 z-50 ${
        theme === "light" ? "bg-white text-gray-800 shadow-gray-300" : ""
      }`}
    >
      <nav className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className={`text-xl sm:text-2xl font-bold ${
            theme === "light" ? "text-[#00C4B4]" : "text-[#00C4B4]"
          } transition-colors duration-200 hover:opacity-80`}
        >
          Workly
        </NavLink>
        <div className="flex items-center">
          {/* Hamburger Menu Button */}
          <button
            onClick={handleToggleMenu}
            className="sm:hidden p-2 text-[#00C4B4] focus:outline-none focus:ring-2 focus:ring-[#00C4B4] transition-all duration-200"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
          {/* Navigation Links - Visible on Desktop, Hidden on Mobile Unless Toggled */}
          <div className="hidden sm:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `uppercase ${
                  theme === "light"
                    ? "text-[#00C4B4] hover:text-[#00C4B4]/80"
                    : "text-[#00C4B4] hover:text-[#00C4B4]/80"
                } ${isActive ? "font-semibold" : ""}`
              }
            >
              Workshops
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `uppercase ${
                  theme === "light"
                    ? "text-[#00C4B4] hover:text-[#00C4B4]/80"
                    : "text-[#00C4B4] hover:text-[#00C4B4]/80"
                } ${isActive ? "font-semibold" : ""}`
              }
            >
              My Dashboard
            </NavLink>
            {/* Theme Toggle Button - At the End on Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C4B4] transition-all duration-200"
              aria-label="Toggle theme"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {theme === "light" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                )}
              </svg>
            </button>
          </div>
          {/* Mobile Menu Dropdown */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 right-4 sm:hidden bg-[#1A2526] p-4 rounded-lg shadow-lg w-48 z-40"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block uppercase text-[#00C4B4] hover:text-[#00C4B4]/80 py-2 ${
                    isActive ? "font-semibold" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Workshops
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `block uppercase text-[#00C4B4] hover:text-[#00C4B4]/80 py-2 ${
                    isActive ? "font-semibold" : ""
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                My Dashboard
              </NavLink>
            </motion.div>
          )}
          {/* Theme Toggle Button - Always Visible on Mobile */}
          <div className="sm:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00C4B4] transition-all duration-200"
              aria-label="Toggle theme"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {theme === "light" ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </motion.header>
  );
}

export default Header;