import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    if (!STORE || !TOKEN) {
      return res.status(500).json({ error: "Missing Shopify ENV variables" });
    }

    const url = `${STORE}/admin/api/2024-01/orders.json`;

    const response = await axios.get(url, {
      headers: {
        "X-Shopify-Access-Token": TOKEN,
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Shopify API Error:", error.response?.data || error.message);
    return res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}
