import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    const headers = {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    };

    // Fetch all products
    const productRes = await axios.get(
      `${STORE}/admin/api/2024-01/products.json`,
      { headers }
    );

    const products = productRes.data.products || [];

    // Format products
    const formatted = products.map((p) => ({
      id: p.id,
      title: p.title,
      sku: p.variants?.[0]?.sku || "N/A",
      price: parseFloat(p.variants?.[0]?.price || 0),
      stock: p.variants?.[0]?.inventory_quantity ?? 0,
      category: p.product_type || "Uncategorized",
      image: p.image?.src || "",
    }));

    return res.status(200).json({ products: formatted });
  } catch (error) {
    console.error("PRODUCTS API ERROR:", error.response?.data || error.message);
    return res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}
