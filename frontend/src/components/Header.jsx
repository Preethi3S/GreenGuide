import { LogOut, Menu, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../features/auth/authSlice.js';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <header className="bg-secondary text-white py-6 sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-8 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
           <div className="w-8 h-8 border-2 border-primary rounded-lg flex items-center justify-center text-primary">
              <span className="font-serif font-bold text-lg">B</span>
           </div>
           <span className="text-2xl font-serif font-bold text-white tracking-wide group-hover:text-primary transition-colors">Blooming</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10 font-medium text-gray-300 text-sm tracking-wide">
          <Link to="/plants" className="hover:text-white transition-colors">Plants</Link>
          <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
          <Link to="/about" className="hover:text-white transition-colors">About</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </nav>

        {/* Icons & Auth */}
        <div className="flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-4">
               <Link
                to="/profile"
                className="hidden md:flex items-center gap-1 hover:text-primary transition-colors font-medium text-white"
              >
                <UserCircle size={20} />
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-1 hover:text-red-500 transition-colors font-medium text-white"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
             <Link
                to="/login"
                className="hidden md:block bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-primary-hover transition-colors text-sm"
              >
                Login
              </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-dark-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-card shadow-lg py-4 px-6 flex flex-col gap-4 border-t border-dark-border">
          <Link to="/plants" className="text-dark-muted hover:text-primary">Plants</Link>
          <Link to="/shop" className="text-dark-muted hover:text-primary">Shop</Link>
          <Link to="/contact" className="text-dark-muted hover:text-primary">Contact</Link>
          <Link to="/about" className="text-dark-muted hover:text-primary">About</Link>
          <div className="border-t border-dark-border pt-4 flex flex-col gap-3">
             {user ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 text-dark-muted hover:text-primary">
                    <UserCircle size={18} /> Profile
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 text-left">
                    <LogOut size={18} /> Logout
                  </button>
                </>
             ) : (
                <Link to="/register" className="bg-primary text-dark-bg text-center py-2 rounded-full font-bold">
                  Sign Up
                </Link>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
