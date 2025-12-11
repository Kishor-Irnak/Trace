export type OrderStatus = 'Completed' | 'Pending' | 'Processing' | 'Cancelled';
export type PaymentStatus = 'Paid' | 'Unpaid' | 'Refunded';

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'Active' | 'Draft' | 'Archived';
  sku: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  items: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  tags: string[];
  avatar: string;
}

export interface DiscountCode {
  id: string;
  code: string;
  type: 'Percentage' | 'Fixed';
  value: number;
  usageCount: number;
  expiry: string;
  status: 'Active' | 'Expired';
}

export interface FunnelData {
  stage: string;
  users: number;
  fill: string;
}

export interface ChartData {
  name: string;
  value: number;
  uv?: number;
}