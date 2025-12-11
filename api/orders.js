import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    const headers = {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    };

    const response = await axios.get(`${STORE}/admin/api/2024-01/orders.json`, {
      headers,
    });

    const orders = response.data.orders || [];

    const formattedOrders = orders.map((o) => ({
      id: o.order_number ? `#${o.order_number}` : o.id.toString(),
      customerName:
        o.customer?.first_name || o.customer?.last_name
          ? `${o.customer?.first_name || ""} ${
              o.customer?.last_name || ""
            }`.trim()
          : "Guest Customer",
      customerEmail: o.contact_email || o.email || "N/A",
      date: new Date(o.created_at).toLocaleDateString(),
      items: o.line_items?.length || 0,
      total: parseFloat(o.total_price || 0),
      status:
        o.financial_status === "paid"
          ? "Completed"
          : o.cancelled_at
          ? "Cancelled"
          : "Processing",
    }));

    return res.status(200).json({ orders: formattedOrders });
  } catch (error) {
    console.error("ORDERS API ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}
