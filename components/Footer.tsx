
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src="./logo.png" 
                alt="Mira Attendance Logo" 
                className="h-10 w-auto object-contain rounded-lg grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://peeuumxfdqznbcavwscd.supabase.co/storage/v1/object/public/images/1769919595011-ff1p78x.png";
                }}
              />
              <span className="ml-3 text-xl font-bold text-slate-900">
                Mira Attendance 4.0
              </span>
            </div>
            <p className="text-slate-500 max-w-sm">
              Empowering organizations with smart, reliable, and transparent attendance management systems. Open-source and privacy-first.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Documentation</a></li>
              <li><a href="https://github.com/BhanuTechLab/mira-attendance-4.0" className="text-slate-600 hover:text-blue-600 transition-colors">GitHub Repository</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Releases</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-blue-600 font-semibold">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} BhanuTechLab. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="https://x.com/bhanu99517" className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fab fa-twitter text-xl"></i></a>
            <a href="https://github.com/Bhanu99517" className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fab fa-github text-xl"></i></a>
            <a href="https://linkedin.com/in/bhanu99517" className="text-slate-400 hover:text-blue-600 transition-colors"><i className="fab fa-linkedin text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
