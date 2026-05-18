import React, { useState, useEffect } from 'react';
import { Client, ClientFormData, ProjectStatus, PaymentStatus } from '../../types';
import { X, Send, User, Building2, Phone, Mail, Globe, Briefcase, Calendar, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClientFormProps {
  client?: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ClientFormData) => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ client, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ClientFormData>({
    businessName: '',
    clientName: '',
    phone: '',
    email: '',
    websiteUrl: '',
    packageType: '',
    projectStatus: 'Lead',
    paymentStatus: 'Pending',
    startDate: new Date().toISOString().split('T')[0],
    monthlyFee: 0,
    amountPaid: 0,
    paymentDueDate: new Date().toISOString().split('T')[0],
    notes: '',
    onboarding: {
      logoReceived: false,
      contentReceived: false,
      imagesReceived: false,
      domainConnected: false,
      hostingConnected: false,
    }
  });

  useEffect(() => {
    if (client) {
      setFormData({
        businessName: client.businessName,
        clientName: client.clientName,
        phone: client.phone,
        email: client.email,
        websiteUrl: client.websiteUrl || '',
        packageType: client.packageType,
        projectStatus: client.projectStatus,
        paymentStatus: client.paymentStatus,
        startDate: client.startDate,
        monthlyFee: client.monthlyFee || 0,
        amountPaid: client.amountPaid || 0,
        paymentDueDate: client.paymentDueDate || new Date().toISOString().split('T')[0],
        notes: client.notes || '',
        onboarding: client.onboarding
      });
    } else {
      setFormData({
        businessName: '',
        clientName: '',
        phone: '',
        email: '',
        websiteUrl: '',
        packageType: '',
        projectStatus: 'Lead',
        paymentStatus: 'Pending',
        startDate: new Date().toISOString().split('T')[0],
        monthlyFee: 0,
        amountPaid: 0,
        paymentDueDate: new Date().toISOString().split('T')[0],
        notes: '',
        onboarding: {
          logoReceived: false,
          contentReceived: false,
          imagesReceived: false,
          domainConnected: false,
          hostingConnected: false,
        }
      });
    }
  }, [client, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const projectStatuses: ProjectStatus[] = ['Lead', 'Waiting Deposit', 'In Progress', 'Waiting On Client', 'Completed', 'Monthly Maintenance'];
  const paymentStatuses: PaymentStatus[] = ['Paid', 'Deposit Paid', 'Pending', 'Overdue'];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-45%' }}
            className="fixed left-1/2 top-1/2 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#121212] border border-zinc-800 rounded-[2.5rem] shadow-2xl z-[101] p-8 md:p-10 hide-scrollbar"
          >
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                  {client ? 'Edit Partner' : 'Initiate Partnership'}
                </h2>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1">Configure partner profile & logistics</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-zinc-800 text-zinc-400 hover:text-white rounded-2xl border border-zinc-700/50 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Identity Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      <Building2 className="w-3 h-3" /> Business Identity
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      placeholder="Brand Name"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      <User className="w-3 h-3" /> Lead Representative
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                      placeholder="Contact Name"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Communication Channels</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      <Phone className="w-3 h-3" /> Direct Contact
                    </label>
                    <input 
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="44789654321..."
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      <Mail className="w-3 h-3" /> Digital Inbox
                    </label>
                    <input 
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="hello@domain.com"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                   <div className="md:col-span-2 space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      <Globe className="w-3 h-3" /> Project Extension (URL)
                    </label>
                    <input 
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                      placeholder="https://client-site.com"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Project Logistics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      <Briefcase className="w-3 h-3" /> Service Tier
                    </label>
                    <input 
                      required
                      type="text"
                      value={formData.packageType}
                      onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                      placeholder="e.g. Pro Maintenance"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      <Calendar className="w-3 h-3" /> Commencement
                    </label>
                    <input 
                      required
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Flow Status
                    </label>
                    <select 
                      value={formData.projectStatus}
                      onChange={(e) => setFormData({...formData, projectStatus: e.target.value as ProjectStatus})}
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-bold text-zinc-300 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      {projectStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Fiscal Status
                    </label>
                    <select 
                      value={formData.paymentStatus}
                      onChange={(e) => setFormData({...formData, paymentStatus: e.target.value as PaymentStatus})}
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-bold text-zinc-300 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                    >
                      {paymentStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300">Fiscal Logistics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Monthly Fee (ZAR)
                    </label>
                    <input 
                      required
                      type="number"
                      value={formData.monthlyFee}
                      onChange={(e) => setFormData({...formData, monthlyFee: Number(e.target.value)})}
                      placeholder="e.g. 500"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Amount Paid (ZAR)
                    </label>
                    <input 
                      required
                      type="number"
                      value={formData.amountPaid}
                      onChange={(e) => setFormData({...formData, amountPaid: Number(e.target.value)})}
                      placeholder="e.g. 300"
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                      Payment Due
                    </label>
                    <input 
                      required
                      type="date"
                      value={formData.paymentDueDate}
                      onChange={(e) => setFormData({...formData, paymentDueDate: e.target.value})}
                      className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-2xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                 <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest pl-1">
                  <FileText className="w-3 h-3" /> Partner Manifest (Notes)
                </label>
                <textarea 
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Internal notes, specific client requests, or project nuances..."
                  className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-3xl px-5 py-4 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all placeholder:text-zinc-700"
                />
              </section>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[2rem] font-black italic uppercase tracking-widest text-lg transition-all shadow-xl shadow-blue-900/30 flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  {client ? 'Commit Updates' : 'Authorize Expansion'}
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};