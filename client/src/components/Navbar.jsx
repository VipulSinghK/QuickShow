// src/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, TicketIcon, Menu, X } from 'lucide-react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser, useAuth } from '@clerk/clerk-react';

const Navbar = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dbUser, setDbUser] = useState(null); // 🧠 store PostgreSQL user

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'Favorites', path: '/favorites' },
    { name: 'Profile', path: '/profile' },
    { name: 'Contact', path: '/contact' },
  ];

  // 🔥 When user logs in, fetch or create user in Postgres
  useEffect(() => {
    const fetchDbUser = async () => {
      if (!user) return;
      try {
        const token = await getToken();
        const res = await fetch('http://localhost:3000/api/user/db', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setDbUser(data);
        console.log('🧠 Synced user from Postgres:', data);
      } catch (error) {
        console.error('❌ Failed to fetch DB user:', error);
      }
    };
    fetchDbUser();
  }, [user]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-100 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="CinemaHub Home">
            <img
              src={assets.Logo}
              alt="CinemaHub Logo"
              className="w-36 h-auto transition-transform transform hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/144x40?text=CinemaHub';
              }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-medium hover:text-gray-300 transition-colors"
                aria-label={`Navigate to ${link.name}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                aria-label={isSearchOpen ? 'Close search bar' : 'Open search bar'}
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>
              {isSearchOpen && (
                <div className="absolute top-12 right-0 w-64 bg-white text-black rounded-md shadow-lg p-2 z-50">
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search movies..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="ml-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Auth Section */}
            {!user ? (
              <button
                onClick={() => openSignIn()}
                className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-transform transform hover:scale-105"
              >
                Login
              </button>
            ) : (
              <>
                {dbUser && (
                  <span className="text-sm mr-2 hidden md:inline">
                     {dbUser.name || 'User'}
                  </span>
                )}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: 'w-8 h-8 border-2 border-white rounded-full',
                      userButtonPopoverCard: 'bg-white text-black shadow-lg',
                    },
                  }}
                >
                  <UserButton.MenuItems>
                    <UserButton.Action
                      label="My Bookings"
                      labelIcon={<TicketIcon size={15} />}
                      onClick={() => navigate('/my-bookings')}
                    />
                    <UserButton.Action
                      label="Profile"
                      labelIcon={<TicketIcon size={15} />}
                      onClick={() => navigate('/profile')}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </>
            )}

            {/* Mobile Menu */}
            <button
              className="md:hidden p-2 hover:bg-gray-800 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-100 px-4 py-4 transition-all duration-300 ease-in-out">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 text-sm font-medium hover:text-gray-300 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
