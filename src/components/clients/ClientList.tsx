import React, { useState } from 'react';
import { Client } from '../../types';
import { 
  Search, 
  Plus, 
  Filter, 
  MessageCircle, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Globe,
  Phone,
  Mail,
  MoreHorizontal,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

interface ClientListProps {
  clients: Client[];
  onAddClient: () => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (id: string) => void;
}

export const ClientList: React.FC<ClientListProps> = ({ clients, onAddClient, onEditClient, onDeleteClient }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.clientName.toLowerCase().includes(search.toLowerCase()) || 
                          c.businessName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'All' || c.projectStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sendWhatsAppReminder = (client: Client) => {
    const phone = client.phone.replace(/\D/g, '');
    const message = `Hi ${client.clientName}, hope you are doing well.\n\nThis is a friendly reminder that your payment for your website service is currently outstanding.\n\nPlease let me know once payment has been made.\n\nThank you, Vibrant Web Solutions`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const statusColors = {
    'Lead': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Waiting Deposit': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'In Progress': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'Waiting On Client': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    'Completed': 'bg-green-500/10 text-green-500 border-green-500/20',
    'Monthly Maintenance': 'bg-green-500/10 text-green-500 border-green-500/20',
  };

  const paymentColors = {
    'Paid': 'bg-green-500',
    'Deposit Paid': 'bg-blue-500',
    'Pending': 'bg-amber-500',
    'Overdue': 'bg-red-500',
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 underline decoration-blue-500/30 decoration-8 underline-offset-[-2px]">
            Active Clients
          </h1>
          <p className="text-zinc-500 font-medium">Your portfolio of Vibrant Web Solutions partners.</p>
        </div>
        <button 
          onClick={onAddClient}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
        >
          <Plus className="w-5 h-5" />
          Add New Partner
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input 
            type="text"
            placeholder="Search partners by name, business or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-[#121212] border border-zinc-800 rounded-2xl focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter className="w-4 h-4 text-zinc-500 hidden sm:block" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 md:w-48 bg-[#121212] border border-zinc-800 rounded-2xl px-6 py-4 text-sm font-bold text-zinc-300 focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
          >
            <option value="All">All Projects</option>
            <option value="Lead">Leads</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Monthly Maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={client.id}
            className="group bg-[#121212] border border-zinc-800 rounded-[2rem] overflow-hidden hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white leading-tight group-hover:text-blue-500 transition-colors uppercase italic tracking-tight">{client.businessName}</h3>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{client.clientName}</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${paymentColors[client.paymentStatus]}`} />
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-tighter">
                    {client.paymentStatus} — R{client.amountPaid?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                  statusColors[client.projectStatus] || statusColors['Lead']
                )}>
                  {client.projectStatus}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                  {client.packageType}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-zinc-800/50">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium truncate">{client.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium truncate">{client.email}</span>
                </div>
                {client.websiteUrl && (
                  <div className="flex items-center gap-3 text-zinc-400 col-span-2">
                    <Globe className="w-4 h-4 text-blue-500" />
                    <a href={client.websiteUrl} target="_blank" rel="noreferrer" className="text-xs font-medium truncate hover:text-blue-500 transition-colors">
                      {client.websiteUrl.replace('https://', '')}
                    </a>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEditClient(client)}
                    className="p-3 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 rounded-xl transition-all"
                    title="Edit Partner"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => onDeleteClient(client.id)}
                    className="p-3 bg-zinc-800 text-zinc-100 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-all"
                    title="Remove Partner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                   <button 
                    onClick={() => sendWhatsAppReminder(client)}
                    className="flex-1 px-4 py-3 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Recall
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-zinc-800/30 px-6 py-3 flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Since {client.startDate}</span>
              <button className="text-[10px] font-black text-blue-500 uppercase tracking-tighter hover:underline">Full Profile</button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="bg-[#121212] border border-zinc-800 rounded-[2.5rem] p-20 text-center">
          <Zap className="w-16 h-16 text-zinc-800 mx-auto mb-6" />
          <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">No partners found</h3>
          <p className="text-zinc-500 font-medium mt-2">Adjust your search or add a new partner to your portfolio.</p>
          <button 
            onClick={onAddClient}
            className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 uppercase tracking-widest text-xs"
          >
            Initiate Expansion
          </button>
        </div>
      )}
    </div>
  );
};