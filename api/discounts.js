import axios from "axios";

export default async function handler(req, res) {
  try {
    const STORE = process.env.VITE_SHOPIFY_STORE_URL;
    const TOKEN = process.env.VITE_SHOPIFY_ADMIN_TOKEN;

    const headers = {
      "X-Shopify-Access-Token": TOKEN,
      "Content-Type": "application/json",
    };

    // 1) Fetch price rules
    const priceRulesRes = await axios.get(
      `${STORE}/admin/api/2024-01/price_rules.json`,
      { headers }
    );

    const priceRules = priceRulesRes.data.price_rules || [];

    let allDiscounts = [];

    // 2) For each price rule → fetch discount codes
    for (const rule of priceRules) {
      const codesRes = await axios.get(
        `${STORE}/admin/api/2024-01/price_rules/${rule.id}/discount_codes.json`,
        { headers }
      );

      const codes = codesRes.data.discount_codes || [];

      codes.forEach((code) => {
        allDiscounts.push({
          id: code.id,
          code: code.code,
          type: rule.value_type === "percentage" ? "Percentage" : "Fixed",
          value:
            rule.value_type === "percentage"
              ? Math.abs(rule.value) * 100 // value is stored as -0.10 for 10%
              : Math.abs(rule.value),
          usageCount: code.usage_count || 0,
          expiry: rule.ends_at
            ? new Date(rule.ends_at).toLocaleDateString()
            : "No expiry",
          status:
            rule.ends_at && new Date(rule.ends_at) < new Date()
              ? "Expired"
              : "Active",
        });
      });
    }

    return res.status(200).json({ discounts: allDiscounts });
  } catch (err) {
    console.error("DISCOUNT API ERROR:", err.response?.data || err.message);
    return res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
}
