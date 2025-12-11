import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, Tag, Settings, Truck } from 'lucide-react';
import GlassCard from './GlassCard';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: ShoppingCart, label: 'Orders', path: '/orders' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Truck, label: 'Inventory', path: '/inventory' },
    { icon: BarChart3, label: 'Marketing', path: '/marketing' },
    { icon: Tag, label: 'Discounts', path: '/discounts' },
  ];

  return (
    <div className="h-full w-full md:py-4 md:pl-4">
      <GlassCard className="h-full w-full flex flex-col justify-between rounded-none border-y-0 border-l-0 md:border md:rounded-2xl !bg-white/95 dark:!bg-slate-950/95 md:!bg-white/70 md:dark:!bg-slate-900/60">
        <div>
          <div className="flex items-center gap-3 px-2 mb-10 pt-4 md:pt-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Trace
            </span>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
           <button className="flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors w-full">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
           </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default Sidebar;