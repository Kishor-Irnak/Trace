import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    const headers = {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    };

    // 1. Fetch all products
    const productRes = await axios.get(
      `${STORE}/admin/api/2024-01/products.json`,
      { headers }
    );

    const products = productRes.data.products || [];

    let inventoryItems = [];

    // 2. For each product, get inventory levels
    for (const product of products) {
      product.variants.forEach((variant) => {
        inventoryItems.push({
          id: variant.id,
          title: product.title,
          sku: variant.sku || "N/A",
          image: product.image?.src || "",
          stock: variant.inventory_quantity ?? 0,
        });
      });
    }

    return res.status(200).json({ inventory: inventoryItems });
  } catch (err) {
    console.error("INVENTORY ERROR:", err.response?.data || err.message);
    return res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
}
