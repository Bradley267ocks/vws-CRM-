import React, { useMemo } from 'react';
import { Client, Payment } from '../../types';
import { Users, Briefcase, TrendingUp, AlertCircle, Zap, ArrowUpRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';

interface DashboardProps {
  clients: Client[];
  payments: Payment[];
}

export const Dashboard: React.FC<DashboardProps> = ({ clients, payments }) => {
  const stats = useMemo(() => {
    const totalClients = clients.length;
    const activeProjects = clients.filter(c => ['In Progress', 'Monthly Maintenance'].includes(c.projectStatus)).length;
    
    // New Financial Calculations based on Client data
    const monthlyRevenue = clients.reduce((acc, c) => acc + (c.amountPaid || 0), 0);
    const activeMonthlyIncome = clients.reduce((acc, c) => acc + (c.monthlyFee || 0), 0);
    
    const overdueTotal = clients
      .filter(c => c.paymentStatus === 'Overdue')
      .reduce((acc, c) => acc + Math.max(0, (c.monthlyFee || 0) - (c.amountPaid || 0)), 0);
      
    const outstandingTotal = clients
      .filter(c => ['Pending', 'Overdue'].includes(c.paymentStatus))
      .reduce((acc, c) => acc + Math.max(0, (c.monthlyFee || 0) - (c.amountPaid || 0)), 0);

    return {
      totalClients,
      activeProjects,
      monthlyRevenue,
      activeMonthlyIncome,
      overdueTotal,
      outstandingTotal
    };
  }, [clients]);

  const chartData = [
    { name: 'Jan', revenue: 0 },
    { name: 'Feb', revenue: 0 },
    { name: 'Mar', revenue: 0 },
    { name: 'Apr', revenue: 0 },
    { name: 'May', revenue: stats.monthlyRevenue || 0 },
  ];

  const cards = [
    { label: 'Monthly Revenue', value: `R${stats.monthlyRevenue.toLocaleString()}`, icon: TrendingUp, trend: 'Collected', color: 'bg-blue-600' },
    { label: 'Active Monthly Income', value: `R${stats.activeMonthlyIncome.toLocaleString()}`, icon: Users, trend: 'Recurring', color: 'bg-blue-500' },
    { label: 'Outstanding Revenue', value: `R${stats.outstandingTotal.toLocaleString()}`, icon: Zap, trend: 'Pending', color: 'bg-blue-400' },
    { label: 'Overdue Payments', value: `R${stats.overdueTotal.toLocaleString()}`, icon: AlertCircle, trend: 'Immediate', color: 'bg-red-500' },
  ];

  const activities: any[] = [];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 underline decoration-blue-500/30 decoration-8 underline-offset-[-2px]">
            Master Overview
          </h1>
          <p className="text-zinc-500 font-medium">Tracking growth for Vibrant Web Solutions.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded-xl text-xs font-bold text-zinc-300 uppercase tracking-widest">
          <Clock className="w-3.5 h-3.5 text-blue-500" />
          Last update: Just now
        </div>
      </header>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={card.label}
            className="group relative bg-[#121212] border border-zinc-800 p-5 rounded-3xl hover:border-blue-500/50 transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <card.icon className="w-12 h-12" />
            </div>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-3">{card.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-black text-white">{card.value}</h3>
              <div className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                <ArrowUpRight className="w-2.5 h-2.5 text-blue-500" />
                {card.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart Section */}
        <div className="lg:col-span-2 bg-[#121212] border border-zinc-800 p-8 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Revenue Trajectory</h3>
              <p className="text-zinc-500 text-sm mt-1">Overall performance for the last 5 months</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-zinc-800 rounded-lg text-xs font-bold text-zinc-100">Monthly</button>
              <button className="px-3 py-1 text-xs font-bold text-zinc-500">Yearly</button>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#71717a', fontSize: 11, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#18181b', 
                    borderRadius: '16px', 
                    border: '1px solid #27272a',
                    color: '#fff' 
                  }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-[#121212] border border-zinc-800 p-8 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Activity Pulse</h3>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Latest</span>
          </div>
          <div className="space-y-6">
            {activities.map((activity, idx) => (
              <div key={idx} className="flex gap-4 group cursor-default">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  activity.status === 'Paid' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' :
                  activity.status === 'Alert' ? 'bg-red-500 animate-pulse' :
                  'bg-blue-500'
                }`} />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-100 group-hover:text-blue-500 transition-colors">{activity.title}</p>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-3 border border-zinc-800 rounded-2xl text-xs font-bold tracking-widest text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all uppercase">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
};