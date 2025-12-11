import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    const ordersRes = await axios.get(
      `${STORE}/admin/api/2024-01/orders.json`,
      { headers: { "X-Shopify-Access-Token": TOKEN } }
    );

    const customersRes = await axios.get(
      `${STORE}/admin/api/2024-01/customers.json`,
      { headers: { "X-Shopify-Access-Token": TOKEN } }
    );

    const orders = ordersRes.data.orders || [];
    const customers = customersRes.data.customers || [];

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total_price || 0),
      0
    );

    const stats = {
      totalRevenue,
      totalOrders: orders.length,
      totalCustomers: customers.length,
      recentOrders: orders.slice(0, 5),
    };

    return res.status(200).json(stats);
  } catch (err) {
    return res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
}
