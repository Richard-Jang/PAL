import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaVideo, FaComments, FaRobot, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/forum', label: 'Forum', icon: <FaComments /> },
    { to: '/chat', label: 'AI Chat', icon: <FaRobot /> },
    { to: '/video', label: 'Video', icon: <FaVideo /> },
    { to: '/profile', label: 'Profile', icon: <FaUser /> },
  ];

  const activeClassName = "flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white shadow-md shadow-indigo-200 transition-all duration-300";
  const inactiveClassName = "flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300 font-medium";

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <span className="font-black text-xl italic tracking-tighter">P</span>
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700 tracking-tighter hidden sm:block">
                PAL
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? activeClassName : inactiveClassName)}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
            <div className="h-6 w-[1px] bg-slate-200 mx-2"></div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 font-medium"
            >
              <FaSignOutAlt />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-indigo-600 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-colors"
            >
              <span className="text-lg"><FaSignOutAlt /></span>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
