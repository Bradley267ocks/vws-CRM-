import React from 'react';
import { auth } from '../../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { MessageSquare, LogIn } from 'lucide-react';
import { motion } from 'motion/react';

export const LoginView: React.FC = () => {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-emerald-500" />
        
        <div className="flex flex-col items-center text-center">
          <div className="bg-indigo-50 p-4 rounded-3xl mb-6">
            <MessageSquare className="w-10 h-10 text-indigo-600" />
          </div>
          
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">ServiceFlow CRM</h1>
          <p className="text-slate-500 mt-3 text-lg">
            Manage your service clients, track payments, and automate reminders in one place.
          </p>

          <div className="mt-12 w-full">
            <button
              onClick={handleLogin}
              className="w-full bg-slate-900 text-white flex items-center justify-center gap-3 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group"
            >
              <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Sign in with Google
            </button>
            <p className="text-slate-400 text-xs mt-6">
              By signing in, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
