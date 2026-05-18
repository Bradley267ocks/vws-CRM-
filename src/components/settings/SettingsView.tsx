import React from 'react';
import { Settings, Shield, Bell, User, Building2, Mail, Phone, Moon, Palette, Save, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export const SettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 underline decoration-blue-500/30 decoration-8 underline-offset-[-2px]">
          System Config
        </h1>
        <p className="text-zinc-500 font-medium">Calibrate your internal business environment.</p>
      </header>

      <div className="space-y-8">
        <div className="bg-[#121212] border border-zinc-800 p-10 rounded-[2.5rem] space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-100 italic">Vibrant Web Identity</h3>
            </div>
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  <Building2 className="w-3 h-3" /> Brand Authority
                </label>
                <input 
                  type="text" 
                  defaultValue="Vibrant Web Solutions"
                  className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-medium text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  <Mail className="w-3 h-3" /> Central Ops Email
                </label>
                <input 
                  type="email" 
                  defaultValue="hello@vibrantweb.io"
                  className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-medium text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  <Phone className="w-3 h-3" /> Command Line (WhatsApp)
                </label>
                <input 
                  type="text" 
                  defaultValue="+44 7896 543210"
                  className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-medium text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </section>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black italic uppercase tracking-widest py-5 rounded-[2rem] transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3 group">
            <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Commit Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
