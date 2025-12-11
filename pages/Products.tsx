import React, { useEffect, useState } from "react";
import GlassCard from "../components/GlassCard";
import { Search } from "lucide-react";
import { Product } from "../types";

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Products API Error:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Products
        </h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Product Table */}
      <GlassCard className="p-0 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50">
            <tr className="text-slate-500 dark:text-slate-400 text-sm">
              <th className="py-4 px-6 font-medium">Product</th>
              <th className="py-4 px-6 font-medium">SKU</th>
              <th className="py-4 px-6 font-medium">Category</th>
              <th className="py-4 px-6 font-medium">Price</th>
              <th className="py-4 px-6 font-medium">Stock</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredProducts.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-6 text-center text-slate-500 dark:text-slate-400"
                >
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-200"
                      />
                      <span className="font-medium text-slate-800 dark:text-white">
                        {product.title}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-sm text-slate-500">
                    {product.sku}
                  </td>

                  <td className="py-4 px-6 text-sm text-slate-500">
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                      {product.category}
                    </span>
                  </td>

                  <td className="py-4 px-6 font-medium text-slate-800 dark:text-white">
                    ₹{product.price.toFixed(2)}
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          product.stock > 10
                            ? "bg-green-500"
                            : product.stock > 0
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      ></div>
                      <span className="text-sm">{product.stock} in stock</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
};

export default Products;
