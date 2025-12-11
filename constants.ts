import { ChartData, Customer, DiscountCode, FunnelData, Order, Product } from "./types";

export const MOCK_REVENUE_DATA: ChartData[] = [
  { name: 'Mon', value: 4000, uv: 2400 },
  { name: 'Tue', value: 3000, uv: 1398 },
  { name: 'Wed', value: 2000, uv: 9800 },
  { name: 'Thu', value: 2780, uv: 3908 },
  { name: 'Fri', value: 1890, uv: 4800 },
  { name: 'Sat', value: 2390, uv: 3800 },
  { name: 'Sun', value: 3490, uv: 4300 },
];

export const MOCK_FUNNEL_DATA: FunnelData[] = [
  { stage: 'View Product', users: 12000, fill: '#8b5cf6' },
  { stage: 'Add to Cart', users: 4500, fill: '#a78bfa' },
  { stage: 'Checkout', users: 1500, fill: '#c4b5fd' },
  { stage: 'Purchase', users: 850, fill: '#ddd6fe' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'Wireless Headphones', category: 'Electronics', price: 129.99, stock: 45, image: 'https://picsum.photos/100/100?random=1', status: 'Active', sku: 'WH-001' },
  { id: '2', title: 'Ergonomic Chair', category: 'Furniture', price: 299.00, stock: 12, image: 'https://picsum.photos/100/100?random=2', status: 'Active', sku: 'EC-099' },
  { id: '3', title: 'Mechanical Keyboard', category: 'Electronics', price: 89.50, stock: 8, image: 'https://picsum.photos/100/100?random=3', status: 'Active', sku: 'MK-102' },
  { id: '4', title: 'Ceramic Vase', category: 'Home Decor', price: 24.00, stock: 120, image: 'https://picsum.photos/100/100?random=4', status: 'Active', sku: 'CV-333' },
  { id: '5', title: 'Leather Wallet', category: 'Accessories', price: 45.00, stock: 3, image: 'https://picsum.photos/100/100?random=5', status: 'Active', sku: 'LW-005' },
];

export const MOCK_ORDERS: Order[] = [
  { id: '#ORD-7829', customerName: 'Alex Morgan', customerEmail: 'alex@example.com', date: 'Oct 24, 2023', total: 154.99, status: 'Completed', paymentStatus: 'Paid', items: 2 },
  { id: '#ORD-7830', customerName: 'Sarah Connor', customerEmail: 'sarah@example.com', date: 'Oct 24, 2023', total: 299.00, status: 'Processing', paymentStatus: 'Paid', items: 1 },
  { id: '#ORD-7831', customerName: 'James Cameron', customerEmail: 'jim@example.com', date: 'Oct 23, 2023', total: 45.00, status: 'Pending', paymentStatus: 'Unpaid', items: 3 },
  { id: '#ORD-7832', customerName: 'Ellen Ripley', customerEmail: 'ellen@example.com', date: 'Oct 22, 2023', total: 89.50, status: 'Cancelled', paymentStatus: 'Refunded', items: 1 },
];

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'C1', name: 'Alex Morgan', email: 'alex@example.com', orders: 5, spent: 1200.50, tags: ['VIP', 'Returning'], avatar: 'https://picsum.photos/50/50?random=10' },
  { id: 'C2', name: 'Sarah Connor', email: 'sarah@example.com', orders: 1, spent: 299.00, tags: ['New'], avatar: 'https://picsum.photos/50/50?random=11' },
  { id: 'C3', name: 'James Cameron', email: 'jim@example.com', orders: 12, spent: 4500.00, tags: ['Wholesale'], avatar: 'https://picsum.photos/50/50?random=12' },
];

export const MOCK_DISCOUNTS: DiscountCode[] = [
  { id: 'D1', code: 'WELCOME10', type: 'Percentage', value: 10, usageCount: 145, expiry: '2024-12-31', status: 'Active' },
  { id: 'D2', code: 'SUMMER25', type: 'Percentage', value: 25, usageCount: 450, expiry: '2023-08-31', status: 'Expired' },
  { id: 'D3', code: 'FLASH50', type: 'Fixed', value: 50, usageCount: 12, expiry: '2024-01-01', status: 'Active' },
];
