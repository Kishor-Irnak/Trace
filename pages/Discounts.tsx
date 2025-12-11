import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { Ticket } from "lucide-react";

const Discounts: React.FC = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/discounts")
      .then((res) => res.json())
      .then((data) => {
        setDiscounts(data.discounts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Discounts API error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-slate-500">Loading discounts...</p>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Discount Codes
        </h1>
      </div>

      {discounts.length === 0 && (
        <p className="text-slate-500 text-center py-10">
          No discount codes found.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discounts.map((discount) => (
          <GlassCard key={discount.id} className="relative group">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-xl">
                <Ticket size={24} />
              </div>
              <div>
                <h3 className="text-xl font-mono font-bold text-slate-800 dark:text-white">
                  {discount.code}
                </h3>
                <p className="text-sm text-slate-500">
                  {discount.type === "Percentage"
                    ? `${discount.value}% Off`
                    : `₹${discount.value} Fixed Off`}
                </p>
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Used</span>
                <span className="font-semibold">
                  {discount.usageCount} times
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Expires</span>
                <span className="font-semibold">{discount.expiry}</span>
              </div>
            </div>

            <div className="mt-4">
              <div
                className={`w-full py-2 rounded-lg text-sm font-semibold text-center transition
                ${
                  discount.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                }`}
              >
                {discount.status}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
