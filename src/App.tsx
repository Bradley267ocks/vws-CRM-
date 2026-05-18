import React, { useState, useEffect } from 'react';
import { Client, ProjectStatus, PaymentStatus, Payment, ClientFormData } from './types';
import { Shell } from './components/layout/Shell';
import { Dashboard } from './components/dashboard/Dashboard';
import { ClientList } from './components/clients/ClientList';
import { ClientForm } from './components/clients/ClientForm';
import { PaymentsView } from './components/payments/PaymentsView';
import { SettingsView } from './components/settings/SettingsView';

// Helper to load from localStorage
const loadData = <T,>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error(`Failed to parse ${key} from localStorage`, e);
    }
  }
  return defaultValue;
};

export default function App() {
  const [clients, setClients] = useState<Client[]>(() => loadData('vibrant_clients', []));
  const [payments, setPayments] = useState<Payment[]>(() => loadData('vibrant_payments', []));
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('vibrant_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('vibrant_payments', JSON.stringify(payments));
  }, [payments]);
  
  // Client Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleCreateClient = (data: ClientFormData) => {
    const newClient: Client = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
    };
    setClients([newClient, ...clients]);
    setIsFormOpen(false);
  };

  const handleUpdateClient = (data: ClientFormData) => {
    if (!editingClient) return;
    setClients(clients.map(c => c.id === editingClient.id ? { ...c, ...data } : c));
    setIsFormOpen(false);
    setEditingClient(null);
  };

  const handleDeleteClient = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    setClients(clients.filter(c => c.id !== id));
  };

  const handleMarkPaid = (paymentId: string) => {
    setPayments(payments.map(p => {
      if (p.id === paymentId) {
        const client = clients.find(c => c.id === p.clientId);
        if (client) {
            setClients(clients.map(c => c.id === client.id ? { ...c, paymentStatus: 'Paid' } : c));
        }
        return { ...p, status: 'Paid' };
      }
      return p;
    }));
  };

  return (
    <div className="antialiased text-zinc-100 selection:bg-blue-500/30">
      <Shell activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'dashboard' && <Dashboard clients={clients} payments={payments} />}
        {activeTab === 'clients' && (
          <ClientList 
            clients={clients} 
            onAddClient={() => {
              setEditingClient(null);
              setIsFormOpen(true);
            }} 
            onEditClient={(c) => {
              setEditingClient(c);
              setIsFormOpen(true);
            }}
            onDeleteClient={handleDeleteClient}
          />
        )}
        {activeTab === 'payments' && (
          <PaymentsView 
            payments={payments} 
            onMarkPaid={handleMarkPaid}
          />
        )}
        {activeTab === 'settings' && <SettingsView />}
      </Shell>

      <ClientForm 
        isOpen={isFormOpen} 
        client={editingClient}
        onClose={() => {
          setIsFormOpen(false);
          setEditingClient(null);
        }}
        onSubmit={editingClient ? handleUpdateClient : handleCreateClient}
      />
    </div>
  );
}
