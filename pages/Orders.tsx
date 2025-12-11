import React, { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import {
  Search,
  Filter,
  CheckCircle,
  Edit2,
  X,
  Save,
  Trash2,
} from "lucide-react";
import { Order, OrderStatus } from "../types";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Shopify Orders
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Orders API Error:", err);
        setLoading(false);
      });
  }, []);

  // Toggle Status (UI Only)
  const toggleStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
              ...o,
              status:
                o.status === "Processing"
                  ? "Pending"
                  : o.status === "Pending"
                  ? "Completed"
                  : o.status === "Completed"
                  ? "Processing"
                  : "Processing",
            }
          : o
      )
    );
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this order?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingOrder) return;
    setOrders((prev) =>
      prev.map((o) => (o.id === editingOrder.id ? editingOrder : o))
    );
    setEditingOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter = filter === "All" || order.status === filter;
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  if (loading)
    return (
      <p className="text-center py-10 text-slate-500">Loading Orders...</p>
    );

  return (
    <div className="space-y-6">
      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <GlassCard className="w-full max-w-lg relative">
            <button
              onClick={() => setEditingOrder(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-6">
              Edit Order {editingOrder.id}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Customer Name</label>
                  <input
                    type="text"
                    value={editingOrder.customerName}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        customerName: e.target.value,
                      })
                    }
                    className="input"
                  />
                </div>

                <div>
                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    value={editingOrder.customerEmail}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        customerEmail: e.target.value,
                      })
                    }
                    className="input"
                  />
                </div>

                <div>
                  <label className="text-sm">Amount</label>
                  <input
                    type="number"
                    value={editingOrder.total}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        total: Number(e.target.value),
                      })
                    }
                    className="input"
                  />
                </div>

                <div>
                  <label className="text-sm">Items Count</label>
                  <input
                    type="number"
                    value={editingOrder.items}
                    onChange={(e) =>
                      setEditingOrder({
                        ...editingOrder,
                        items: Number(e.target.value),
                      })
                    }
                    className="input"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button type="submit" className="btn-primary">
                  <Save size={18} /> Save
                </button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Main Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>

        <div className="flex gap-2">
          <input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800"
          />
          <button className="px-4 py-2 bg-white dark:bg-slate-800 border rounded-xl">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {["All", "Completed", "Processing", "Pending", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full ${
                filter === status
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-800"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {/* Orders Table */}
      <GlassCard className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-500">
                    No Orders Found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="px-6 py-4 text-indigo-600">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-xs text-slate-500">
                        {order.customerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4 font-medium">₹{order.total}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(order.id)}
                        className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
                      >
                        {order.status}
                      </button>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingOrder(order)}
                          className="p-2 hover:bg-indigo-100 rounded-lg"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="p-2 hover:bg-red-100 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

export default Orders;
