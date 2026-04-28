
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, LogIn, UserCircle } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCandidate, setIsCandidate] = useState(false);
  const location = useLocation();

  useEffect(() => {
      // Check if candidate is simulated logged in
      const checkAuth = () => {
        const auth = sessionStorage.getItem('mosaic_candidate_auth');
        setIsCandidate(!!auth);
      };
      checkAuth();
      const interval = setInterval(checkAuth, 2000);
      return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Don't show standard navbar on dashboard or admin routes
  if (location.pathname.startsWith('/employer/dashboard') || location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-stone-100 fixed w-full z-50 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center min-w-[280px]">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              {/* Attempt to load the actual image you provided */}
              <img 
                src="/logo.png" 
                alt="Mosaic Talent Consulting" 
                className="h-10 w-auto object-contain transition-all duration-500 group-hover:scale-105"
                onLoad={(e) => {
                  e.currentTarget.classList.remove('hidden');
                  e.currentTarget.nextElementSibling?.classList.add('hidden');
                }}
                onError={(e) => {
                  e.currentTarget.classList.add('hidden');
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              {/* High-fidelity CSS fallback that matches your provided logo's aesthetic */}
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold bg-gradient-to-r from-mosaic-teal via-mosaic-blue to-mosaic-purple bg-clip-text text-transparent leading-relaxed py-1 tracking-tight transition-all duration-500 uppercase">MOSAIC</span>
                <span className="text-[10px] text-stone-500 font-medium tracking-[0.2em] uppercase whitespace-nowrap mt-1">Talent Consulting</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            <div className="flex items-center space-x-8 mr-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all hover:text-mosaic-teal relative group whitespace-nowrap ${
                    location.pathname === item.path ? 'text-mosaic-teal' : 'text-stone-500'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 bg-mosaic-teal transition-all duration-500 group-hover:w-full ${location.pathname === item.path ? 'w-full' : ''}`}></span>
                </Link>
              ))}
            </div>
            
            <div className="h-8 w-px bg-stone-100 mx-4"></div>
            
            {isCandidate ? (
                <div className="flex items-center text-[10px] font-black text-mosaic-teal uppercase tracking-[0.3em]">
                    <UserCircle className="w-5 h-5 mr-3" />
                    Hi, Candidate
                </div>
            ) : (
                <Link to="/employer/login" className="text-[10px] font-black text-stone-500 hover:text-mosaic-teal flex items-center uppercase tracking-[0.3em] transition-colors">
                    <LogIn className="w-4 h-4 mr-3" />
                    Employer Login
                </Link>
            )}

            <Link to="/contact">
                <Button size="sm" className="bg-mosaic-dark hover:bg-mosaic-teal text-white px-8 py-4 rounded-none text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl transition-all">
                  Book a Call
                </Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-stone-600 hover:text-mosaic-teal focus:outline-none transition-colors">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 h-screen overflow-y-auto">
          <div className="px-6 pt-12 pb-12 space-y-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block text-3xl font-serif font-bold tracking-tighter ${
                  location.pathname === item.path 
                    ? 'text-mosaic-teal' 
                    : 'text-mosaic-dark hover:text-mosaic-teal'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-stone-100 pt-8">
                 <Link to="/employer/login" onClick={() => setIsOpen(false)} className="block text-xl font-serif font-bold text-stone-500 hover:text-mosaic-teal">Employer Login</Link>
            </div>
            <div className="mt-12">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <Button className="w-full py-8 bg-mosaic-dark hover:bg-mosaic-teal text-white rounded-none uppercase tracking-[0.3em] text-xs font-black">Book a Call</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
