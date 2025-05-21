import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wallet, Menu, X, ChevronDown, LogOut, User, Home } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setProfileDropdownOpen(false);
  };

  return (
    <header className="bg-dark-200 border-b border-dark-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Wallet className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-white">CryptoType</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-dark-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-dark-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                
                {/* Profile dropdown */}
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={toggleProfileDropdown}
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                        {user?.username?.[0] || user?.address?.[2] || '?'}
                      </div>
                      <span className="ml-2 text-dark-600">{user?.username || user?.address?.substring(0, 6) + '...' + user?.address?.substring(user?.address.length - 4)}</span>
                      <ChevronDown className="ml-1 h-4 w-4 text-dark-600" />
                    </button>
                  </div>
                  
                  {profileDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-dark-300 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-dark-700 hover:bg-dark-400"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </div>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-sm text-dark-700 hover:bg-dark-400"
                      >
                        <div className="flex items-center">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Connect Wallet
              </Link>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-dark-600 hover:text-white hover:bg-dark-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-200 border-t border-dark-300">
            <Link
              to="/"
              className="text-dark-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Home
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-dark-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-dark-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-dark-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  <div className="flex items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </div>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Connect Wallet
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;