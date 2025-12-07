import React, { useState } from 'react';
import { generateLogoConcept } from '../services/geminiService';
import { GenerationStatus } from '../types';

export const LogoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setStatus(GenerationStatus.LOADING);
    setError('');
    
    try {
      // We are reusing the service but pivoting the prompt slightly in the user's mind
      // The service still expects a design prompt, so we frame it as such.
      const enhancedPrompt = `A minimal abstract geometric badge representing the vibe: "${prompt}". Minimalist, black and white, simple strokes.`;
      const svg = await generateLogoConcept(enhancedPrompt);
      setSvgContent(svg);
      setStatus(GenerationStatus.SUCCESS);
    } catch (e) {
      setError('Failed to generate vibe. Please try again.');
      setStatus(GenerationStatus.ERROR);
    }
  };

  const handleSurpriseMe = () => {
    const ideas = [
      "Rainy day reading a book with coffee",
      "Late night coding session focus",
      "Sunny park picnic with acoustic guitar",
      "Urban photography walk downtown",
      "Quiet museum wandering",
      "High energy rooftop party"
    ];
    setPrompt(ideas[Math.floor(Math.random() * ideas.length)]);
  };

  return (
    <div className="mt-12 p-8 md:p-12 bg-black text-white rounded-[40px] relative overflow-hidden shadow-2xl">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-900 to-purple-900 rounded-full blur-[100px] opacity-40 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div className="mb-6 md:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                    <h2 className="text-2xl font-bold tracking-tight">Vibe Laboratory</h2>
                </div>
                <p className="text-white/60 max-w-lg leading-relaxed text-sm md:text-base">
                Knock uses AI to visualize your current "Vibe" on the radar. Describe what you're doing or feeling, and we'll generate your unique temporary signal badge.
                </p>
            </div>
            
             {/* Status Indicator */}
             <div className="hidden md:block">
                <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-mono text-white/70">
                    POWERED BY GEMINI 2.5
                </div>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Input Area */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-white/40 font-mono pl-1">Your Current Vibe</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Sipping espresso and sketching people..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-xl text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none h-40 font-light"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={handleGenerate}
                disabled={status === GenerationStatus.LOADING || !prompt}
                className="flex-1 bg-white text-black font-semibold py-4 px-8 rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                {status === GenerationStatus.LOADING ? (
                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {status === GenerationStatus.LOADING ? 'Synthesizing...' : 'Generate Badge'}
              </button>
              
              <button 
                onClick={handleSurpriseMe}
                className="px-6 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors text-white/70 font-medium"
              >
                Randomize
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2 flex items-center"><span className="mr-2">●</span>{error}</p>}
          </div>

          {/* Output Area */}
          <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/10 flex items-center justify-center min-h-[300px] relative p-8 shadow-inner backdrop-blur-sm group">
            
            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30"></div>
            <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-white/30"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-white/30"></div>
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30"></div>

            {status === GenerationStatus.SUCCESS && svgContent ? (
              <div className="relative">
                 <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-150 animate-pulse-slow"></div>
                 <div className="w-48 h-48 text-white animate-in fade-in zoom-in duration-700 ease-out relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    <div 
                        dangerouslySetInnerHTML={{ __html: svgContent }} 
                        className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:stroke-white [&>svg]:fill-white [&>svg]:stroke-2"
                    />
                 </div>
              </div>
            ) : (
              <div className="text-center text-white/20 flex flex-col items-center">
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
                  <svg className="w-16 h-16 relative opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-mono text-xs uppercase tracking-widest opacity-50">Signal Empty</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};