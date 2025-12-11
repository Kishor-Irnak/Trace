import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const StatWidget = ({ title, value, trend, isPositive, icon: Icon }: any) => (
  <GlassCard className="flex flex-col justify-between relative overflow-hidden group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div
        className={`p-3 rounded-xl ${
          isPositive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
        }`}
      >
        <Icon size={20} />
      </div>
    </div>

    <div className="flex items-center gap-1 text-sm">
      {isPositive ? (
        <ArrowUpRight size={16} className="text-green-500" />
      ) : (
        <ArrowDownRight size={16} className="text-red-500" />
      )}
      <span className={isPositive ? "text-green-500" : "text-red-500"}>
        {trend}
      </span>
      <span className="text-slate-400">from last month</span>
    </div>
  </GlassCard>
);

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats)
    return <p className="text-center py-10 text-xl">Loading Shopify data...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-slate-500">Now showing live Shopify analytics.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatWidget
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toFixed(2)}`}
          trend="+0%"
          isPositive={true}
          icon={DollarSign}
        />

        <StatWidget
          title="Total Orders"
          value={stats.totalOrders}
          trend="+0%"
          isPositive={true}
          icon={ShoppingBag}
        />

        <StatWidget
          title="Total Customers"
          value={stats.totalCustomers}
          trend="+0%"
          isPositive={true}
          icon={Users}
        />

        <StatWidget
          title="Conversion Rate"
          value="3.24%"
          trend="+0%"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      {/* Recent Orders */}
      <GlassCard>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Recent Orders</h2>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-slate-500 text-sm">
              <th className="pb-3">Order ID</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Amount</th>
            </tr>
          </thead>

          <tbody>
            {stats.recentOrders.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-slate-500">
                  No orders found.
                </td>
              </tr>
            )}

            {stats.recentOrders.map((order: any) => (
              <tr
                key={order.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="py-3 font-medium text-indigo-600">
                  #{order.order_number}
                </td>
                <td className="py-3">
                  {order.customer?.first_name || "Unknown"}
                </td>
                <td className="py-3 text-slate-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 font-medium">₹{order.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
