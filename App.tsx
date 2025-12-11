import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Marketing from './pages/Marketing';
import Discounts from './pages/Discounts';
import { Moon, Sun, Menu, User } from 'lucide-react';
import GlassCard from './components/GlassCard';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`flex h-screen w-full bg-gradient-to-br from-slate-50 to-indigo-50/30 dark:from-slate-950 dark:to-slate-900`}>
        <div className="relative z-10 flex w-full h-full">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar Wrapper for Mobile Toggle */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="h-20 px-6 flex items-center justify-between shrink-0">
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        <Menu />
                    </button>

                    <div className="flex ml-auto items-center gap-4">
                        <button 
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-indigo-400 shadow-sm border border-white/20"
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        
                        <GlassCard className="!p-2 !rounded-full flex items-center gap-3 pr-4 cursor-pointer hover:bg-white/80 transition">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                                <User size={16} />
                            </div>
                            <span className="text-sm font-medium hidden sm:block text-slate-700 dark:text-slate-200">Trace Admin</span>
                        </GlassCard>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
                    <div className="max-w-7xl mx-auto pb-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/discounts" element={<Discounts />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;