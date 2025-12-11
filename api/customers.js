import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    const response = await axios.get(
      `${STORE}/admin/api/2024-01/customers.json`,
      {
        headers: {
          "X-Shopify-Access-Token": TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    const customers = response.data.customers || [];

    const formattedCustomers = customers.map((c) => ({
      id: c.id.toString(),
      name: `${c.first_name || ""} ${c.last_name || ""}`.trim(),
      email: c.email || "N/A",
      orders: c.orders_count || 0,
      spent: c.total_spent ? Number(c.total_spent) : 0,
      tags: c.tags ? c.tags.split(",") : [],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        c.first_name || "U"
      )}&background=random`,
    }));

    return res.status(200).json({ customers: formattedCustomers });
  } catch (err) {
    return res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
}
