import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardCheck, 
  CreditCard, 
  Settings,
  Menu, 
  X, 
  Zap,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ShellProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Shell: React.FC<ShellProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#121212] border-r border-zinc-800/50 sticky top-0 h-screen z-30">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-tight">Vibrant Web</h1>
              <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Solutions CRM</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center justify-between group px-4 py-3.5 rounded-xl transition-all duration-300",
                activeTab === item.id 
                  ? "bg-blue-600/10 text-blue-500 font-semibold" 
                  : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
              )}
            >
              <div className="flex items-center gap-3.5">
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  activeTab === item.id ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              </div>
              {activeTab === item.id && (
                <motion.div layoutId="active-nav-indicator">
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </motion.div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto">
          <div className="p-4 rounded-2xl bg-zinc-800/30 border border-zinc-700/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-xs font-bold text-blue-500">BJ</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-100">Bradley Jones</p>
                <p className="text-[10px] text-zinc-500">Admin Account</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-red-400 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 bg-[#121212] border-b border-zinc-800/50 flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="font-bold text-zinc-100 tracking-tight">Vibrant Web</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 bg-zinc-800/50 text-zinc-400 hover:text-zinc-100 rounded-xl border border-zinc-700/50 transition-all"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45]"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-72 bg-[#121212] z-[50] p-6 shadow-2xl flex flex-col border-l border-zinc-800"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-bold text-lg text-zinc-100">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-zinc-400">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-lg transition-all",
                        activeTab === item.id 
                          ? "bg-blue-600/10 text-blue-500 font-bold border border-blue-500/20" 
                          : "text-zinc-400 hover:text-zinc-100"
                      )}
                    >
                      <item.icon className="w-6 h-6" />
                      {item.label}
                    </button>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#0a0a0a] relative">
          <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};