import React, { useState } from "react";
import jsPDF from "jspdf";
import { useCart } from "./CartContext";

const API = "http://localhost:5000/api";

function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { cart, removeFromCart, changeQty, clearCart, total, itemCount } = useCart();

  const validerCommande = async () => {
    if (cart.length === 0) return alert("Le panier est vide !");

    const address = prompt("Entrez votre adresse de livraison :") || "Adresse par défaut";
    setCheckoutLoading(true);

    try {
      const res = await fetch(`${API}/cart/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erreur lors du checkout");
        return;
      }

      if (data.orderId) {
        try {
          const invoiceRes = await fetch(`${API}/cart/invoice/${data.orderId}`, {
            credentials: "include",
          });
          const invoice = await invoiceRes.json();
          generatePDF(invoice);
        } catch {
          generatePDFFromCart(cart, total, address);
        }
      } else {
        generatePDFFromCart(cart, total, address);
      }

      clearCart();
      setOpen(false);
    } catch (err) {
      console.error("Erreur checkout:", err);
      alert("Erreur réseau");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ── PDF manuel sans autoTable ──
  const drawTable = (doc, headers, rows, startY, accentR, accentG, accentB) => {
    const colWidths = [70, 30, 30, 30, 30];
    const rowHeight = 9;
    const marginLeft = 14;
    let y = startY;

    // Header row
    doc.setFillColor(accentR, accentG, accentB);
    doc.rect(marginLeft, y, 182, rowHeight, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    let x = marginLeft + 3;
    headers.forEach((h, i) => {
      doc.text(h, x, y + 6);
      x += colWidths[i];
    });
    y += rowHeight;

    // Data rows
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    rows.forEach((row, ri) => {
      if (ri % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(marginLeft, y, 182, rowHeight, "F");
      }
      doc.setDrawColor(220, 220, 220);
      doc.rect(marginLeft, y, 182, rowHeight, "S");
      x = marginLeft + 3;
      row.forEach((cell, i) => {
        doc.text(String(cell), x, y + 6);
        x += colWidths[i];
      });
      y += rowHeight;
    });

    return y; // retourne la position Y finale
  };

  const generatePDFFromCart = (cartItems, totalAmount, address) => {
    const doc = new jsPDF();

    // Header
    doc.setFillColor(0, 180, 255);
    doc.rect(0, 0, 210, 28, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("GYM STORE — FACTURE", 14, 18);

    // Infos
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, 14, 38);
    doc.text(`Adresse : ${address}`, 14, 45);

    // Tableau
    const headers = ["Produit", "Qté", "Prix", "Total", "Marque"];
    const rows = cartItems.map(item => [
      item.name?.substring(0, 28) || "-",
      String(item.quantity),
      `${item.price} TND`,
      `${item.price * item.quantity} TND`,
      item.brand?.substring(0, 12) || "-",
    ]);

    const finalY = drawTable(doc, headers, rows, 53, 0, 180, 255);

    // Total
    doc.setFillColor(0, 180, 255);
    doc.rect(14, finalY + 4, 182, 12, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`TOTAL : ${totalAmount} TND`, 17, finalY + 13);

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.setFont("helvetica", "italic");
    doc.text("Merci pour votre commande — GYM STORE", 14, 285);

    doc.save("facture_gymstore.pdf");
  };

  const generatePDF = (invoice) => {
    const doc = new jsPDF();

    doc.setFillColor(0, 180, 255);
    doc.rect(0, 0, 210, 28, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(255, 255, 255);
    doc.text("GYM STORE — FACTURE", 14, 18);

    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`Date : ${new Date(invoice.date).toLocaleDateString("fr-FR")}`, 14, 38);
    doc.text(`Client : ${invoice.client || ""}`, 14, 45);
    doc.text(`Email : ${invoice.email || ""}`, 14, 52);

    const headers = ["Produit", "Qté", "Prix", "Total", ""];
    const rows = (invoice.produits || []).map(item => [
      (item.Product?.name || item.name || "-").substring(0, 28),
      String(item.quantity),
      `${item.price} TND`,
      `${item.price * item.quantity} TND`,
      "",
    ]);

    const finalY = drawTable(doc, headers, rows, 60, 0, 180, 255);

    doc.setFillColor(0, 180, 255);
    doc.rect(14, finalY + 4, 182, 12, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(`TOTAL : ${invoice.total} TND`, 17, finalY + 13);

    doc.setFontSize(9);
    doc.setTextColor(180, 180, 180);
    doc.setFont("helvetica", "italic");
    doc.text("Merci pour votre commande — GYM STORE", 14, 285);

    doc.save("facture_gymstore.pdf");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed", bottom: "30px", right: "30px", zIndex: 1000,
          background: "linear-gradient(135deg,#00e6ff,#0077ff)",
          border: "none", borderRadius: "50px", padding: "14px 22px",
          cursor: "pointer", boxShadow: "0 0 25px rgba(0,230,255,0.5)",
          display: "flex", alignItems: "center", gap: "10px",
          color: "black", fontWeight: "900", fontSize: "15px",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,230,255,0.8)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 25px rgba(0,230,255,0.5)"; }}
      >
        <span style={{ fontSize: "20px" }}>🛒</span>
        <span>Panier</span>
        {itemCount > 0 && (
          <span style={{
            background: "#ff3366", color: "white", borderRadius: "50%",
            width: "24px", height: "24px", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "12px", fontWeight: "900",
            boxShadow: "0 0 10px rgba(255,51,102,0.7)",
          }}>
            {itemCount}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 1001 }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "fixed", top: 0, right: open ? 0 : "-420px",
        width: "400px", height: "100vh", background: "#0d0d0d",
        borderLeft: "1px solid rgba(0,230,255,0.2)", zIndex: 1002,
        transition: "right 0.35s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
        boxShadow: "-10px 0 50px rgba(0,0,0,0.7)",
      }}>
        {/* Header */}
        <div style={{
          padding: "24px 20px", borderBottom: "1px solid rgba(0,230,255,0.15)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "rgba(0,230,255,0.03)",
        }}>
          <div>
            <h2 style={{ color: "#00e6ff", margin: 0, fontSize: "18px", letterSpacing: "2px" }}>🛒 MON PANIER</h2>
            <p style={{ color: "#555", margin: "4px 0 0", fontSize: "12px" }}>{itemCount} article{itemCount !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)",
              color: "white", width: "36px", height: "36px", borderRadius: "50%",
              cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >×</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.35, gap: "12px" }}>
              <span style={{ fontSize: "52px" }}>🛒</span>
              <p style={{ color: "white", fontSize: "14px" }}>Votre panier est vide</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "14px", padding: "14px", marginBottom: "12px",
                display: "flex", alignItems: "center", gap: "12px",
              }}>
                <div style={{
                  width: "54px", height: "54px", borderRadius: "10px",
                  background: "rgba(0,230,255,0.07)", border: "1px solid rgba(0,230,255,0.2)",
                  overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.image
                    ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "22px" }}>📦</span>
                  }
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "white", fontWeight: "700", margin: "0 0 3px", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.name}
                  </p>
                  <p style={{ color: "#00e6ff", margin: 0, fontSize: "13px", fontWeight: "600" }}>
                    {item.price * item.quantity} TND
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <button onClick={() => changeQty(item.id, -1)} style={qtyBtn}>−</button>
                  <span style={{ color: "white", fontSize: "13px", minWidth: "18px", textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => changeQty(item.id, 1)} style={qtyBtn}>+</button>
                  <button onClick={() => removeFromCart(item.id)} style={deleteBtn}>🗑</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "20px", borderTop: "1px solid rgba(0,230,255,0.15)", background: "rgba(0,230,255,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ color: "#aaa", fontSize: "14px" }}>Total</span>
              <span style={{ color: "#00e6ff", fontWeight: "900", fontSize: "22px" }}>{total} TND</span>
            </div>
            <button
              onClick={validerCommande}
              disabled={checkoutLoading}
              style={{
                width: "100%", background: checkoutLoading ? "rgba(0,230,255,0.3)" : "linear-gradient(135deg,#00e6ff,#0077ff)",
                color: "black", border: "none", borderRadius: "12px", padding: "14px",
                fontWeight: "900", fontSize: "14px", cursor: checkoutLoading ? "not-allowed" : "pointer",
                letterSpacing: "1px", boxShadow: "0 4px 20px rgba(0,230,255,0.3)", marginBottom: "10px",
              }}
            >
              {checkoutLoading ? "⏳ EN COURS..." : "✅ VALIDER & PDF"}
            </button>
            <button
              onClick={clearCart}
              style={{
                width: "100%", background: "transparent", color: "#ff5555",
                border: "1px solid rgba(255,85,85,0.3)", borderRadius: "12px",
                padding: "10px", fontWeight: "700", fontSize: "13px", cursor: "pointer",
              }}
            >
              Vider le panier
            </button>
          </div>
        )}
      </div>
    </>
  );
}

const qtyBtn = {
  background: "rgba(0,230,255,0.1)", border: "1px solid rgba(0,230,255,0.25)",
  color: "#00e6ff", width: "26px", height: "26px", borderRadius: "8px",
  cursor: "pointer", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center",
};
const deleteBtn = {
  background: "rgba(255,51,51,0.1)", border: "1px solid rgba(255,51,51,0.25)",
  color: "#ff5555", width: "26px", height: "26px", borderRadius: "8px",
  cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center",
};

export default CartDrawer;