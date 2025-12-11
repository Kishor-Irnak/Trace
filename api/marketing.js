import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    const headers = {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    };

    // 1️⃣ Fetch orders
    const ordersRes = await axios.get(
      `${STORE}/admin/api/2024-01/orders.json`,
      { headers }
    );
    const orders = ordersRes.data.orders || [];

    // 2️⃣ Fetch abandoned checkouts
    const checkoutRes = await axios.get(
      `${STORE}/admin/api/2024-01/checkouts.json`,
      { headers }
    );
    const abandoned = checkoutRes.data.checkouts || [];

    // 3️⃣ Funnel Data (approximation)
    const funnel = [
      {
        stage: "Visited Store",
        users: abandoned.length + orders.length + 20,
        fill: "#6366f1",
      },
      {
        stage: "Added to Cart",
        users: abandoned.length + orders.length,
        fill: "#a855f7",
      },
      {
        stage: "Reached Checkout",
        users: abandoned.length + orders.length,
        fill: "#3b82f6",
      },
      { stage: "Completed Order", users: orders.length, fill: "#10b981" },
    ];

    // 4️⃣ Abandoned checkout formatted list
    const abandonedFormatted = abandoned.map((c) => ({
      id: c.id,
      cartId: c.cart_token,
      total: c.total_price,
      createdAt: c.created_at,
      items: c.line_items?.length || 0,
      customerEmail: c.email,
    }));

    return res.status(200).json({
      funnel,
      abandoned: abandonedFormatted,
      ordersCount: orders.length,
      abandonedCount: abandoned.length,
    });
  } catch (error) {
    console.error(
      "MARKETING API ERROR:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ error: error.response?.data || error.message });
  }
}
