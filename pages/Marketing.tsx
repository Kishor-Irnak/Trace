import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Mail, ShoppingCart, ArrowRight } from "lucide-react";

const Marketing: React.FC = () => {
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [abandoned, setAbandoned] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/marketing")
      .then((res) => res.json())
      .then((data) => {
        setFunnelData(data.funnel);
        setAbandoned(data.abandoned);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Marketing API Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center py-10">Loading marketing data...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Marketing Insights</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-6">Conversion Funnel</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData}>
                <XAxis dataKey="stage" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="users" radius={[8, 8, 0, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Static Traffic Sources (optional to integrate later with Google/Meta Ads) */}
        <GlassCard>
          <h2 className="text-lg font-bold mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {[
              { source: "Direct", val: "45%", color: "bg-indigo-500" },
              { source: "Social Media", val: "32%", color: "bg-purple-500" },
              { source: "Organic Search", val: "15%", color: "bg-blue-500" },
              { source: "Referral", val: "8%", color: "bg-amber-500" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.source}</span>
                  <span className="font-bold">{item.val}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: item.val }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Abandoned Checkouts */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 text-red-600 rounded-lg">
            <ShoppingCart size={20} />
          </div>
          <h2 className="text-lg font-bold">Abandoned Checkouts</h2>
        </div>

        <div className="grid gap-4">
          {abandoned.length === 0 && (
            <p className="text-slate-500 text-sm">No abandoned checkouts 🎉</p>
          )}

          {abandoned.map((cart, i) => (
            <div
              key={cart.id}
              className="flex flex-col sm:flex-row justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/30 border"
            >
              <div>
                <p className="font-bold">Cart #{cart.cartId}</p>
                <p className="text-sm text-slate-500">
                  {cart.items} items • ₹{cart.total} •{" "}
                  {new Date(cart.createdAt).toLocaleString()}
                </p>
              </div>

              <button className="mt-3 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                <Mail size={16} /> Send Recovery Email
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default Marketing;
