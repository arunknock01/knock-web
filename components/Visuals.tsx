import React from 'react';

// 1. Interaction: The "Knock" Pulse
export const VisualPortal: React.FC = () => {
  return (
    <div className="w-full h-80 bg-knock-gray rounded-3xl flex items-center justify-center overflow-hidden relative group">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      </div>
      
      {/* The User "Knocking" */}
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Ripple 1 */}
        <div className="absolute inset-0 border border-black/5 rounded-full animate-ping-slow" />
        {/* Outer Ripple 2 */}
        <div className="absolute inset-4 border border-black/10 rounded-full animate-ping-slow" style={{ animationDelay: '1s' }} />
        
        {/* The Portal Ring */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl animate-spin-slow duration-[20s]">
          <circle cx="50" cy="50" r="40" fill="none" stroke="black" strokeWidth="2" strokeDasharray="200" strokeDashoffset="60" strokeLinecap="round" />
          <circle cx="50" cy="50" r="32" fill="none" stroke="black" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="10 5" />
        </svg>
        
        {/* The Core Signal */}
        <div className="absolute w-6 h-6 bg-black rounded-full animate-pulse shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-125 cursor-pointer">
             <div className="absolute -inset-2 border border-black rounded-full animate-ping opacity-20"></div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-6 text-xs font-mono text-knock-subtle uppercase tracking-widest flex items-center gap-2">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Waiting for input
      </div>
    </div>
  );
};

// 2. Radar: Finding People
export const VisualGrid: React.FC = () => {
  return (
    <div className="w-full h-80 bg-black rounded-3xl flex items-center justify-center relative overflow-hidden">
      {/* Radar Grid */}
      <div className="absolute inset-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Radar Sweep */}
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-5 animate-spin-slow rounded-full scale-150"></div>

      {/* Center User */}
      <div className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.5)] z-10" />
      <div className="absolute w-32 h-32 border border-white/10 rounded-full animate-ping-slow" />
      
      {/* Nearby Users */}
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-white/60 rounded-full animate-float shadow-lg" />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-white/60 rounded-full animate-float-delayed shadow-lg" />
      
      {/* Connection Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 500 400 L 250 200" stroke="white" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="5 5" className="animate-pulse" />
      </svg>
       
      <div className="absolute top-6 left-6 text-[10px] font-mono text-white/50 border border-white/20 px-2 py-1 rounded-full">
        Radius: 500m
      </div>
    </div>
  );
};

// 3. Privacy: Anonymity (Black vs White)
export const VisualColor: React.FC = () => {
  return (
    <div className="w-full h-80 flex flex-col md:flex-row rounded-3xl overflow-hidden border border-knock-gray relative group">
      {/* Reveal Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none mix-blend-difference">
         <span className="text-6xl font-bold tracking-tighter text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">IDENTITY</span>
      </div>

      <div className="flex-1 bg-white flex items-center justify-center relative p-8 transition-colors duration-500 group-hover:bg-black">
        <div className="w-24 h-32 rounded-xl bg-gray-100 group-hover:bg-gray-900 transition-colors duration-500 flex flex-col gap-2 p-3">
             <div className="w-full h-20 bg-gray-200 group-hover:bg-gray-800 rounded-lg animate-pulse"></div>
             <div className="w-2/3 h-2 bg-gray-200 group-hover:bg-gray-800 rounded-full"></div>
             <div className="w-1/2 h-2 bg-gray-200 group-hover:bg-gray-800 rounded-full"></div>
        </div>
        <span className="absolute bottom-6 left-6 text-xs font-mono text-knock-subtle group-hover:text-white/50">Public View</span>
      </div>
      
      <div className="flex-1 bg-black flex items-center justify-center relative p-8 transition-colors duration-500 group-hover:bg-white">
        <div className="w-24 h-32 rounded-xl border border-white/20 group-hover:border-black/20 flex items-center justify-center">
             <div className="w-8 h-10 border-2 border-white/40 group-hover:border-black/40 rounded-full relative flex items-center justify-center">
                <div className="w-4 h-4 bg-white/40 group-hover:bg-black/40 rounded-full mb-4"></div>
                <div className="absolute bottom-0 w-6 h-4 bg-white/40 group-hover:bg-black/40 rounded-t-full"></div>
             </div>
        </div>
        <span className="absolute bottom-6 left-6 text-xs font-mono text-white/50 group-hover:text-knock-subtle">Anonymous</span>
      </div>
    </div>
  );
};

// 4. Interface: Typography & UI
export const VisualTypography: React.FC = () => {
  return (
    <div className="w-full h-64 bg-knock-gray rounded-3xl flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
       {/* Background Text Texture */}
       <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
          <div className="text-[10rem] font-bold leading-none -ml-10 -mt-10">KNOCK</div>
       </div>

       {/* Chat Bubble Simulation */}
      <div className="bg-white px-6 py-4 rounded-2xl shadow-sm rounded-bl-none transform translate-y-2 animate-float">
        <p className="text-lg font-medium text-black">Anyone for chess?</p>
      </div>
      <div className="bg-black text-white px-6 py-4 rounded-2xl shadow-xl rounded-br-none transform -translate-y-2 animate-float-delayed z-10">
        <p className="text-lg font-medium">I'm 5 min away.</p>
      </div>
    </div>
  );
};

// 5. App Icon: Branding (Updated with 'k')
export const VisualIcon: React.FC = () => {
  return (
    <div className="w-full h-64 bg-white border border-knock-gray rounded-3xl flex items-center justify-center relative overflow-hidden">
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 opacity-30" 
           style={{ 
             backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', 
             backgroundSize: '16px 16px' 
           }}>
        </div>

        <div className="flex flex-col items-center space-y-6 group z-10">
            {/* iOS Style Icon Container */}
            <div className="w-32 h-32 bg-black rounded-[24%] shadow-2xl flex items-center justify-center relative transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-3 overflow-hidden">
                 
                 {/* Shine effect */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                 {/* The "K" Logo Construction */}
                 <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-500">
                    {/* Vertical Pillar */}
                    <rect x="12" y="8" width="10" height="48" rx="5" fill="white" />
                    
                    {/* The "Kick" / Chevron parts - Stylized */}
                    <path 
                      d="M52 14C52 11.7909 50.2091 10 48 10C46.541 10 45.263 10.785 44.576 11.97L26 31.5L44.576 51.03C45.263 52.215 46.541 53 48 53C50.2091 53 52 51.2091 52 49C52 48.263 51.7909 47.576 51.43 47L38 31.5L51.43 16C51.7909 15.424 52 14.737 52 14Z" 
                      fill="white"
                    />
                 </svg>
            </div>
            
            <div className="flex items-center space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-black">Production Build 1.0</span>
            </div>
        </div>
    </div>
  );
};