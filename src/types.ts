export type ProjectStatus = 'Lead' | 'Waiting Deposit' | 'In Progress' | 'Waiting On Client' | 'Completed' | 'Monthly Maintenance';
export type PaymentStatus = 'Paid' | 'Deposit Paid' | 'Pending' | 'Overdue';

export interface OnboardingChecklist {
  logoReceived: boolean;
  contentReceived: boolean;
  imagesReceived: boolean;
  domainConnected: boolean;
  hostingConnected: boolean;
}

export interface Client {
  id: string;
  businessName: string;
  clientName: string;
  phone: string;
  email: string;
  websiteUrl?: string;
  packageType: string;
  projectStatus: ProjectStatus;
  paymentStatus: PaymentStatus;
  startDate: string;
  monthlyFee: number;
  amountPaid: number;
  paymentDueDate: string;
  onboarding: OnboardingChecklist;
  notes?: string;
}

export interface Payment {
  id: string;
  invoiceNumber: string;
  clientId: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  paymentMethod: string;
}

export type ClientFormData = Omit<Client, 'id'>;
export type PaymentFormData = Omit<Payment, 'id'>;