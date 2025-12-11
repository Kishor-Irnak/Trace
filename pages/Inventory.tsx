import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { AlertTriangle, PackageCheck } from "lucide-react";

interface InvItem {
  id: string | number;
  title: string;
  sku: string;
  image: string;
  stock: number;
}

const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InvItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => {
        setInventory(data.inventory);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Inventory API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-slate-500">Loading Inventory...</p>
    );

  const lowStockItems = inventory.filter((p) => p.stock < 15);
  const healthyStockItems = inventory.filter((p) => p.stock >= 15);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Inventory Management
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LOW STOCK */}
        <GlassCard className="border-l-4 border-l-amber-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-xl">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Low Stock Alerts</h2>
              <p className="text-sm text-slate-500">
                These items need restocking.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {lowStockItems.length === 0 && (
              <p className="text-slate-500 text-sm">No low-stock products 🎉</p>
            )}

            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-10 h-10 rounded-lg bg-slate-200"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-red-500 font-bold">{item.stock} left</p>
                  <button className="text-xs text-indigo-600 font-medium hover:underline">
                    Restock
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* HEALTHY STOCK */}
        <GlassCard className="border-l-4 border-l-emerald-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-xl">
              <PackageCheck size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Healthy Inventory</h2>
              <p className="text-sm text-slate-500">Stock levels look good.</p>
            </div>
          </div>

          <div className="space-y-3">
            {healthyStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-10 h-10 rounded-lg bg-slate-200"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-emerald-600 font-bold">
                    {item.stock} units
                  </p>
                  <span className="text-xs text-slate-400">Optimal</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Inventory;
