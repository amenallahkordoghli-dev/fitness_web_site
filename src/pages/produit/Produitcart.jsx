import React, { useState } from "react";
import { useCart } from "./CartContext";

function ProductCard({ product }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { cart, addToCart } = useCart();

  const inCart = cart.find(item => item.id === product.id);
  const showDates = (product.category === "protein" || product.category === "creatine") && product.prodDate;

  const handleAdd = (e) => {
    e.stopPropagation();
    if (product.stock <= 0) return alert("En rupture de stock !");
    addToCart(product);
  };

  return (
    <>
      {/* ── Card ── */}
      <div
        onClick={() => setModalOpen(true)}
        style={{
          background: "rgba(255,255,255,0.04)",
          borderRadius: "20px",
          padding: "18px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.09)",
          color: "white",
          width: "250px",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
          position: "relative",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,230,255,0.15)";
          e.currentTarget.style.borderColor = "rgba(0,230,255,0.4)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
        }}
      >
        {/* Badge quantité dans le panier */}
        {inCart && (
          <div style={{
            position: "absolute", top: "12px", right: "12px",
            background: "rgba(0,230,255,0.15)", border: "1px solid rgba(0,230,255,0.5)",
            color: "#00e6ff", borderRadius: "20px", padding: "2px 10px",
            fontSize: "11px", fontWeight: "800",
          }}>
            ×{inCart.quantity}
          </div>
        )}

        {/* Image */}
        <div style={{
          width: "100%", height: "150px", borderRadius: "12px", overflow: "hidden",
          marginBottom: "14px", background: "rgba(0,230,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {product.image
            ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <span style={{ fontSize: "44px", opacity: 0.3 }}>📦</span>
          }
        </div>

        <h3 style={{ color: "#00e6ff", margin: "0 0 4px", fontSize: "15px" }}>{product.name}</h3>
        {product.brand && <p style={{ color: "#666", margin: "0 0 8px", fontSize: "12px" }}>{product.brand}</p>}
        <p style={{ fontWeight: "800", fontSize: "18px", margin: "0 0 4px" }}>{product.price} TND</p>

        <p style={{ fontSize: "11px", color: product.stock > 0 ? "#55ff88" : "#ff5555", margin: "0 0 12px" }}>
          {product.stock > 0 ? `✓ En stock (${product.stock})` : "✗ Rupture"}
        </p>

        <button
          onClick={handleAdd}
          disabled={product.stock === 0}
          style={{
            background: product.stock === 0 ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,#00e6ff,#0077ff)",
            color: product.stock === 0 ? "#444" : "black",
            border: "none", borderRadius: "10px", padding: "10px",
            cursor: product.stock === 0 ? "not-allowed" : "pointer",
            width: "100%", fontWeight: "800", fontSize: "13px",
          }}
        >
          {product.stock === 0 ? "Rupture de stock" : "🛒 Ajouter"}
        </button>

        <p style={{ color: "rgba(0,230,255,0.3)", fontSize: "10px", marginTop: "8px", letterSpacing: "1px" }}>
          Cliquer pour détails →
        </p>
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(10px)", zIndex: 2000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#0d0d0d", border: "1px solid rgba(0,230,255,0.2)",
              borderRadius: "24px", maxWidth: "660px", width: "100%", overflow: "hidden",
              boxShadow: "0 0 80px rgba(0,230,255,0.12), 0 30px 60px rgba(0,0,0,0.8)",
            }}
          >
            {/* Image grande */}
            <div style={{
              width: "100%", height: "300px", background: "rgba(0,230,255,0.04)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
            }}>
              {product.image
                ? <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontSize: "80px", opacity: 0.2 }}>📦</span>
              }
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  position: "absolute", top: "14px", right: "14px",
                  background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.15)",
                  color: "white", width: "36px", height: "36px", borderRadius: "50%",
                  cursor: "pointer", fontSize: "20px", display: "flex",
                  alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)",
                }}
              >×</button>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "80px",
                background: "linear-gradient(to top,#0d0d0d,transparent)",
              }} />
            </div>

            {/* Contenu */}
            <div style={{ padding: "28px 32px 32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div>
                  <h2 style={{ color: "#00e6ff", margin: "0 0 4px", fontSize: "22px", fontWeight: "900" }}>{product.name}</h2>
                  {product.brand && <p style={{ color: "#777", margin: 0, fontSize: "13px" }}>par {product.brand}</p>}
                </div>
                <span style={{ color: "#00e6ff", fontSize: "26px", fontWeight: "900" }}>{product.price} TND</span>
              </div>

              {product.description && (
                <p style={{
                  color: "#bbb", lineHeight: "1.7", marginBottom: "16px", fontSize: "14px",
                  borderLeft: "2px solid rgba(0,230,255,0.3)", paddingLeft: "14px",
                }}>
                  {product.description}
                </p>
              )}

              {showDates && (
                <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
                  <span style={{ background: "rgba(255,165,0,0.1)", border: "1px solid rgba(255,165,0,0.3)", color: "#ffa500", borderRadius: "8px", padding: "5px 12px", fontSize: "12px" }}>
                    📅 Fabrication: {product.prodDate}
                  </span>
                  <span style={{ background: "rgba(255,51,51,0.1)", border: "1px solid rgba(255,51,51,0.3)", color: "#ff7777", borderRadius: "8px", padding: "5px 12px", fontSize: "12px" }}>
                    ⚠️ Expiration: {product.expDate}
                  </span>
                </div>
              )}

              <p style={{ color: product.stock > 0 ? "#55ff88" : "#ff5555", fontSize: "13px", marginBottom: "20px" }}>
                {product.stock > 0 ? `✓ En stock — ${product.stock} unités disponibles` : "✗ Rupture de stock"}
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  onClick={e => { handleAdd(e); setModalOpen(false); }}
                  disabled={product.stock === 0}
                  style={{
                    flex: 1,
                    background: product.stock === 0 ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg,#00e6ff,#0077ff)",
                    color: product.stock === 0 ? "#444" : "black",
                    border: "none", borderRadius: "12px", padding: "14px",
                    fontWeight: "900", fontSize: "14px", cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  🛒 Ajouter au Panier
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                    color: "white", borderRadius: "12px", padding: "14px 20px", cursor: "pointer", fontSize: "14px",
                  }}
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;