import React from 'react';
import { Payment } from '../../types';
import { CreditCard, ArrowUpRight, Clock, CheckCircle2, AlertCircle, TrendingUp, Wallet, Banknote } from 'lucide-react';
import { motion } from 'motion/react';

interface PaymentsViewProps {
  payments: Payment[];
  onMarkPaid?: (paymentId: string) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({ payments, onMarkPaid }) => {
  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((acc, curr) => acc + curr.amount, 0);
  const pendingRevenue = payments.filter(p => p.status === 'Pending' || p.status === 'Deposit Paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 underline decoration-blue-500/30 decoration-8 underline-offset-[-2px]">
            Fiscal Ledger
          </h1>
          <p className="text-zinc-500 font-medium">Tracking the fuel behind Vibrant Web Solutions.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-[#121212] border border-zinc-800 p-6 rounded-[2rem] min-w-[200px] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">Total Collected</p>
              <p className="text-2xl font-black text-white">R{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-[#121212] border border-zinc-800 p-6 rounded-[2rem] min-w-[200px] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-black">In Pipeline</p>
              <p className="text-2xl font-black text-white">R{pendingRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="bg-[#121212] border border-zinc-800 rounded-[2.5rem] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/30">
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Ref ID</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Partner</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Volume</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Deadline</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500">Current Phase</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {payments.map((payment, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  key={payment.id} 
                  className="hover:bg-zinc-800/20 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-800 rounded-lg text-zinc-500 group-hover:text-blue-500 transition-colors">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-zinc-300 font-mono text-xs">{payment.invoiceNumber}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-black text-white uppercase italic tracking-tight">{payment.clientName}</span>
                  </td>
                  <td className="px-8 py-6 font-black text-white text-lg italic">R{payment.amount.toLocaleString()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase">
                      <Clock className="w-3 h-3" />
                      {payment.dueDate}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      payment.status === 'Paid' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                      payment.status === 'Overdue' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                    }`}>
                      {payment.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {payment.status !== 'Paid' ? (
                      <button 
                        onClick={() => onMarkPaid?.(payment.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20"
                      >
                        Finalize Collection
                      </button>
                    ) : (
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Settled</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
