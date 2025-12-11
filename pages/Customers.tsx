import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { Mail, Tag as TagIcon, Plus } from "lucide-react";
import { Customer } from "../types";

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  // Fetch real Shopify customers
  useEffect(() => {
    fetch("/api/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data.customers))
      .catch((err) => console.error("Customer API Error:", err));
  }, []);

  const addTag = async (customerId: string) => {
    const tag = prompt("Enter new tag:");
    if (tag) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customerId ? { ...c, tags: [...c.tags, tag] } : c
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
        Customers
      </h1>

      {customers.length === 0 && (
        <p className="text-slate-500 text-center py-10">
          No customers found yet.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <GlassCard key={customer.id} className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-12 h-12 rounded-full border shadow-sm"
                />
                <div>
                  <h3 className="font-bold">{customer.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Mail size={12} /> {customer.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Orders
                </p>
                <p className="text-lg font-semibold">{customer.orders}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">
                  Spent
                </p>
                <p className="text-lg font-semibold text-emerald-600">
                  ₹{customer.spent.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs text-slate-500 font-bold uppercase">
                  Tags
                </p>
                <button
                  onClick={() => addTag(customer.id)}
                  className="text-xs text-indigo-500 hover:text-indigo-600 flex items-center gap-1"
                >
                  <Plus size={12} /> Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {customer.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border flex items-center gap-1"
                  >
                    <TagIcon size={10} /> {tag}
                  </span>
                ))}

                {customer.tags.length === 0 && (
                  <span className="text-xs text-slate-400">No tags yet...</span>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Customers;
