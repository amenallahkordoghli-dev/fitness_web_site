import React, { useState, useEffect } from "react";
import ProductCard from "./Produitcart";
import { CATEGORIES, CATEGORY_LABELS } from "./data";

const API = "http://localhost:5000/api";

function ProductsApp() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = selectedCategory === "all"
          ? `${API}/products`
          : `${API}/products/category/${selectedCategory}`;

        const res = await fetch(url, { credentials: "include" });
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur fetchProducts:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white", padding: "30px 20px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ color: "#00e6ff", fontSize: "28px", letterSpacing: "4px", margin: "0 0 8px" }}>
          GYM STORE
        </h1>
        <p style={{ color: "#555", fontSize: "13px", letterSpacing: "1px" }}>
          {loading ? "Chargement..." : `${products.length} produit${products.length !== 1 ? "s" : ""}`}
        </p>
      </div>

      {/* Filtres catégories */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "8px", marginBottom: "40px" }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "10px 18px",
              background: selectedCategory === cat ? "linear-gradient(135deg,#00e6ff,#0077ff)" : "rgba(255,255,255,0.04)",
              color: selectedCategory === cat ? "black" : "#888",
              border: `1px solid ${selectedCategory === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
              borderRadius: "30px", cursor: "pointer",
              fontWeight: selectedCategory === cat ? "800" : "500",
              fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Grille produits */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {loading ? (
          <p style={{ color: "#555", marginTop: "60px" }}>Chargement des produits...</p>
        ) : products.length === 0 ? (
          <p style={{ color: "#555", marginTop: "60px" }}>Aucun produit dans cette catégorie.</p>
        ) : (
          products.map(prod => <ProductCard key={prod.id} product={prod} />)
        )}
      </div>
    </div>
  );
}

export default ProductsApp;