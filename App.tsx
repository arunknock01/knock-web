import React, { useState, useEffect } from 'react';
import { SECTIONS, NAV_ITEMS, APP_NAME, DOC_VERSION } from './constants';
import { VisualPortal, VisualGrid, VisualColor, VisualTypography, VisualIcon } from './components/Visuals';

// --- Embedded Modal & Legal Components to ensure deployment stability ---

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto overflow-x-hidden">
          <div className="prose prose-sm prose-gray max-w-none prose-headings:font-bold prose-headings:text-black prose-p:leading-relaxed prose-li:marker:text-gray-400">
            {children}
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button 
              onClick={onClose} 
              className="bg-black text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all hover:scale-[1.02] shadow-lg shadow-black/10"
            >
                I Understand
            </button>
        </div>
      </div>
    </div>
  );
};

const PrivacyContent = () => (
  <div className="space-y-6 text-gray-600">
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-500 font-mono mb-6">
      LAST UPDATED: OCTOBER 2025
    </div>

    <section>
        <h3>1. Introduction</h3>
        <p>Knock Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you use our mobile application and services (collectively, the "Service"). By using Knock, you consent to the data practices described in this policy.</p>
    </section>

    <section>
        <h3>2. Information We Collect</h3>
        <p>To provide our unique O2O (Online-to-Offline) experience, we collect specific types of data:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li><strong>Location Data:</strong> This is the core of our "Radar" feature. We collect precise geolocation data only while the app is in use to detect nearby users. We do <strong>not</strong> store historical location trails or track you when the app is fully closed.</li>
            <li><strong>Identity Data:</strong> When you create an account, we may collect verification details (such as phone number or biometrics) to ensure safety. Your full profile (name, photo, bio) is protected by our "Progressive Disclosure" system and is only revealed to others upon mutual acceptance of a Knock.</li>
            <li><strong>Usage Metrics:</strong> We collect anonymous data on interaction patterns to optimize network performance and user experience.</li>
        </ul>
    </section>

    <section>
        <h3>3. How We Use Your Information</h3>
        <p>We use your data strictly to:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Facilitate real-time, hyper-local connections.</li>
            <li>Verify identity and maintain the safety of the community.</li>
            <li>Prevent fraud, spam, and abuse.</li>
            <li>Improve the technical infrastructure of the Service.</li>
        </ul>
        <p>We strictly do <strong>not</strong> sell your personal data to third-party advertisers or data brokers.</p>
    </section>

    <section>
        <h3>4. Data Security</h3>
        <p>We implement enterprise-grade security measures, including AES-256 encryption for data at rest and TLS 1.3 for data in transit. While we strive to protect your personal information, no method of transmission over the Internet is 100% secure.</p>
    </section>

    <section>
        <h3>5. User Rights</h3>
        <p>You have the right to request access to, correction of, or deletion of your personal data at any time directly through the app settings or by contacting our Data Protection Officer.</p>
    </section>

    <section>
        <h3>6. Contact Us</h3>
        <p>If you have questions about this policy, please contact us at <a href="mailto:privacy@knock.app" className="text-black underline underline-offset-2">privacy@knock.app</a>.</p>
    </section>
  </div>
);

const TermsContent = () => (
  <div className="space-y-6 text-gray-600">
    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-500 font-mono mb-6">
      EFFECTIVE DATE: OCTOBER 2025
    </div>

    <section>
        <h3>1. Acceptance of Terms</h3>
        <p>By downloading, accessing, or using the Knock mobile application, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must strictly not use the application.</p>
    </section>

    <section>
        <h3>2. Eligibility</h3>
        <p>You must be at least 18 years of age to use Knock. By using the Service, you represent and warrant that you meet this eligibility requirement.</p>
    </section>

    <section>
        <h3>3. User Conduct</h3>
        <p>You agree to use Knock responsibly. You are strictly prohibited from:</p>
        <ul className="list-disc pl-5 space-y-2">
            <li>Harassing, stalking, threatening, or intimidating other users.</li>
            <li>Impersonating any person or entity.</li>
            <li>Using the app for any illegal purposes or solicitation of illegal acts.</li>
            <li>Attempting to reverse engineer the location algorithms or API.</li>
        </ul>
    </section>

    <section>
        <h3>4. Real-World Safety & Disclaimer</h3>
        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-black my-4">
            <p className="text-sm font-medium text-black m-0"><strong>IMPORTANT SAFETY NOTICE</strong></p>
            <p className="text-sm mt-1 m-0">Knock facilitates real-world meetups. You acknowledge that you are solely responsible for your interactions with other users. Knock Inc. conducts basic verification but cannot guarantee the behavior, background, or safety of any user offline. Always meet in public places, tell a friend where you are, and trust your instincts.</p>
        </div>
    </section>

    <section>
        <h3>5. Termination</h3>
        <p>We reserve the right to suspend or terminate your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
    </section>

    <section>
        <h3>6. Limitation of Liability</h3>
        <p>To the maximum extent permitted by applicable law, Knock Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the Service.</p>
    </section>
    
    <section>
        <h3>7. Governing Law</h3>
        <p>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions.</p>
    </section>
  </div>
);

// --- Main App Component ---

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
