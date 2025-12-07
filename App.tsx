import React, { useState, useEffect } from 'react';
import { SECTIONS, NAV_ITEMS, APP_NAME, DOC_VERSION } from './constants';
import { VisualPortal, VisualGrid, VisualColor, VisualTypography, VisualIcon } from './components/Visuals';
import { Modal, PrivacyContent, TermsContent } from './components/Modals';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(NAV_ITEMS[0].id);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id') || '';
        }
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  const renderVisual = (type?: string) => {
    switch(type) {
      case 'portal': return <VisualPortal />;
      case 'grid': return <VisualGrid />;
      case 'color': return <VisualColor />;
      case 'typography': return <VisualTypography />;
      case 'icon': return <VisualIcon />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation (Desktop) - Kept as requested to maintain 'design spec' feel but repurposed */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 border-r border-gray-100 bg-white/80 backdrop-blur-xl z-50">
        <div className="p-8">
          <h1 className="text-3xl font-bold tracking-tighter mb-1">{APP_NAME}</h1>
          <p className="text-xs font-mono text-knock-subtle uppercase tracking-wider">{DOC_VERSION}</p>
        </div>
        
        <nav className="flex-1 px-4 overflow-y-auto no-scrollbar py-4">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                    activeSection === item.id 
                      ? 'bg-black text-white font-medium translate-x-1 shadow-lg' 
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-8 border-t border-gray-100 bg-gray-50/50">
           <button className="w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-black/20">
             Download Beta
           </button>
           <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] text-knock-subtle">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span>Servers Online</span>
           </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg border-b border-gray-100 z-50 flex items-center justify-between px-6">
         <span className="font-bold text-xl tracking-tight">{APP_NAME}</span>
         <button className="text-xs bg-black text-white px-4 py-2 rounded-full font-medium">Get App</button>
      </header>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-16 max-w-5xl mx-auto pt-24 md:pt-20 w-full">
        
        {/* Hero / Intro */}
        <div className="mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block px-3 py-1 rounded-full border border-black/10 bg-gray-50 text-[10px] font-mono uppercase tracking-widest text-gray-500 mb-6">
            Now Available in UAE
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] text-black">
            Spontaneity <br className="hidden md:block" />
            <span className="text-gray-300">is the new</span><br />
            Luxury.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-2xl font-light">
            Knock is a decentralized social layer for the physical world. 
            Connect with people in your immediate vicinity, right now.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-40">
          {SECTIONS.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-32 group">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Visual Content - Swapped order for variety on desktop if we wanted, but keeping consistent for now */}
                <div className="lg:col-span-6 lg:order-2">
                  {section.visualType !== 'none' && (
                    <div className="transition-all duration-700 transform group-hover:-translate-y-2 group-hover:shadow-2xl rounded-3xl">
                        {renderVisual(section.visualType)}
                    </div>
                  )}
                </div>

                {/* Text Content */}
                <div className="lg:col-span-6 lg:order-1 space-y-8">
                   <div className="flex items-center space-x-3 mb-2 opacity-50">
                       <span className="text-xs font-mono uppercase tracking-widest border border-black px-2 py-1 rounded-md">{section.id}</span>
                       <span className="h-[1px] w-12 bg-black"></span>
                   </div>
                   
                   <div>
                       <h2 className="text-4xl font-bold tracking-tight mb-2">{section.title}</h2>
                       <p className="text-lg text-knock-subtle font-medium">{section.subtitle}</p>
                   </div>
                   
                   <div className="prose prose-lg text-gray-600 leading-relaxed">
                     {section.content.map((paragraph, idx) => (
                       <p key={idx} className="mb-4 font-light">{paragraph}</p>
                     ))}
                   </div>

                   {section.listItems && (
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                       {section.listItems.map((item, idx) => (
                         <li key={idx} className="flex items-center text-sm font-medium text-black bg-gray-50 p-3 rounded-lg border border-gray-100">
                           <span className="mr-3 w-2 h-2 bg-black rounded-full flex-shrink-0"></span>
                           {item}
                         </li>
                       ))}
                     </ul>
                   )}
                </div>

              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-gray-100 pt-16 pb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-8 md:mb-0">
                    <h3 className="text-2xl font-bold tracking-tighter mb-2">Knock.</h3>
                    <p className="text-gray-400 text-sm">Designed in UAE.</p>
                </div>
                <div className="flex space-x-8 text-sm font-medium text-gray-600">
                    <a href="#" className="hover:text-black transition-colors">Twitter</a>
                    <a href="https://www.instagram.com/knock.1.0?igsh=MWVyMHFsM3Jhbno4ZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Instagram</a>
                    <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-black transition-colors">Privacy</button>
                    <button onClick={() => setIsTermsOpen(true)} className="hover:text-black transition-colors">Terms</button>
                </div>
            </div>
            <div className="mt-12 text-xs text-gray-300 text-center md:text-left">
                &copy; 2025 Knock Inc. All rights reserved.
            </div>
        </footer>
      </main>

      {/* Modals */}
      <Modal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} title="Privacy Policy">
        <PrivacyContent />
      </Modal>

      <Modal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} title="Terms of Service">
        <TermsContent />
      </Modal>

    </div>
  );
};

export default App;
