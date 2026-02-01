
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { fetchPrivacyPolicy } from './services/geminiService';
import { PolicyData } from './types';

const App: React.FC = () => {
  const [policy, setPolicy] = useState<PolicyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        const data = await fetchPrivacyPolicy();
        setPolicy(data);
        if (data.sections.length > 0) {
          setActiveSection(data.sections[0].id);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPolicy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!policy) return;
      const scrollPosition = window.scrollY + 120;

      for (const section of policy.sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [policy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 font-medium animate-pulse">Initializing Security Protocols...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 py-16 md:py-24 overflow-hidden relative">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                Security Compliance
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                Privacy & Data Policy
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Official privacy guidelines for the Mira Attendance 4.0 ecosystem. We prioritize your data sovereignty and transparent processing.
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <span className="flex items-center">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Effective Date: {policy?.lastUpdated}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="flex items-center">
                  <i className="fas fa-shield-check mr-2"></i>
                  Release {policy?.version}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Table of Contents - Sidebar */}
            <aside className="lg:col-span-3 hidden lg:block sticky top-28 self-start">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Navigation</h3>
              <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {policy?.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`block py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 border-l-2 ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border-blue-600 translate-x-1 shadow-sm'
                        : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Main Policy Content */}
            <div className="lg:col-span-9 space-y-8">
              {policy?.sections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 transition-all hover:shadow-md scroll-mt-28"
                >
                  <div className="flex items-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center text-blue-600 text-2xl mr-6 shadow-inner">
                      <i className={section.icon}></i>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{section.title}</h2>
                  </div>
                  <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </article>
              ))}

              {/* Security Commitment */}
              <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-6">Our Commitment</h3>
                  <p className="text-slate-400 text-lg mb-8 max-w-2xl">
                    Mira Attendance 4.0 is built on the principle of transparency. If you believe your data has been handled incorrectly, please reach out to our compliance officer immediately.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href="mailto:support@yourdomain.com" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                      Report a Concern
                    </a>
                    <button onClick={() => window.print()} className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all border border-slate-700">
                      <i className="fas fa-print mr-2"></i> Print Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default App;
