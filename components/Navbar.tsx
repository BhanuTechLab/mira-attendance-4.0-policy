
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section - Top Left */}
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <img 
                  src="./logo.png" 
                  alt="Mira Attendance Logo" 
                  className="h-10 w-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://peeuumxfdqznbcavwscd.supabase.co/storage/v1/object/public/images/1769919595011-ff1p78x.png";
                  }}
                />
              </div>
              <span className="ml-3 text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Mira Attendance <span className="text-slate-400 font-medium">4.0</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <a 
                href="https://mira-attendance-3-0-32zf.vercel.app" 
                className="relative text-slate-600 hover:text-blue-600 py-2 text-sm font-semibold transition-all duration-300 group/link"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover/link:w-full"></span>
              </a>
              <a 
                href="https://github.com/sponsors/Bhanu99517" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative text-slate-600 hover:text-blue-600 py-2 text-sm font-semibold transition-all duration-300 group/link"
              >
                <i className="fab fa-github mr-2 transition-transform group-hover/link:rotate-12"></i>
                Support
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover/link:w-full"></span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all focus:outline-none"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : 'rotate-0'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-slate-200 py-6 px-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <a 
            href="https://mira-attendance-3-0-32zf.vercel.app" 
            className="flex items-center text-slate-700 hover:text-blue-600 font-bold py-3 px-4 rounded-xl hover:bg-blue-50 transition-all translate-x-0 hover:translate-x-2"
          >
            <i className="fas fa-home mr-3 w-5"></i>
            Home
          </a>
          <a 
            href="https://github.com/sponsors/Bhanu99517" 
            className="flex items-center text-slate-700 hover:text-blue-600 font-bold py-3 px-4 rounded-xl hover:bg-blue-50 transition-all translate-x-0 hover:translate-x-2"
          >
            <i className="fab fa-github mr-3 w-5"></i>
            Support
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
