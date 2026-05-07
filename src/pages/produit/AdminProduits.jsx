import React, { useState, useEffect } from "react";
import ProductCard from "./Produitcart";
import { CATEGORY_LABELS } from "./data";

const API = "http://localhost:5000/api";
const CATEGORIES_ADMIN = ["protein", "creatine", "supplement", "materiel", "vetements"];

function AdminProduits() {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // Stock update modal
  const [stockModal, setStockModal] = useState(null); // { id, name, currentStock }
  const [stockQty, setStockQty] = useState("");
  const [stockLoading, setStockLoading] = useState(false);

  const [form, setForm] = useState({
    name: "", brand: "", description: "",
    price: "", category: "protein",
    prodDate: "", expDate: "", stock: 10,
  });
  const [errors, setErrors] = useState({});

  const showDates = form.category === "protein" || form.category === "creatine";

  // ── Fetch tous les produits ──
  const fetchProduits = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/products`, { credentials: "include" });
      const data = await res.json();
      setProduits(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur fetchProduits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProduits(); }, []);

  // ── Validation ──
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Requis";
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0) e.price = "Prix invalide";
    if (!imageFile) e.image = "Image requise";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Ajouter produit avec FormData (upload Cloudinary) ──
  const handleAdd = async () => {
    if (!validate()) return;
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("brand", form.brand);
      formData.append("description", form.description);
      formData.append("price", parseFloat(form.price));
      formData.append("category", form.category);
      formData.append("stock", parseInt(form.stock) || 10);
      if (form.prodDate) formData.append("prodDate", form.prodDate);
      if (form.expDate) formData.append("expDate", form.expDate);
      formData.append("image", imageFile); // ← fichier image

      const res = await fetch(`${API}/products`, {
        method: "POST",
        credentials: "include",
        // ⚠️ PAS de Content-Type header — le browser le set automatiquement avec boundary
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Erreur lors de l'ajout");
      await fetchProduits();
      setForm({ name: "", brand: "", description: "", price: "", category: form.category, prodDate: "", expDate: "", stock: 10 });
      setImageFile(null);
      setErrors({});
    } catch (err) {
      console.error("Erreur handleAdd:", err);
      alert("Erreur réseau");
    }
  };

  // ── Supprimer produits sélectionnés ──
  const handleDelete = async () => {
    if (!window.confirm(`Supprimer ${selectedIds.length} produit(s) ?`)) return;
    try {
      await Promise.all(
        selectedIds.map(id =>
          fetch(`${API}/products/${id}`, { method: "DELETE", credentials: "include" })
        )
      );
      await fetchProduits();
      setSelectedIds([]);
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  // ── Update Stock ──
  const handleUpdateStock = async () => {
    if (!stockQty || isNaN(stockQty)) return alert("Quantité invalide");
    setStockLoading(true);
    try {
      const res = await fetch(`${API}/products/stock/${stockModal.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: parseInt(stockQty) }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Erreur");
      await fetchProduits();
      setStockModal(null);
      setStockQty("");
    } catch (err) {
      alert("Erreur réseau");
    } finally {
      setStockLoading(false);
    }
  };

  const toggleSelect = (id) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const filtered = filterCat === "all" ? produits : produits.filter(p => p.category === filterCat);

  const field = (key, placeholder, type = "text", width = "200px") => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label style={styles.label}>{placeholder}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        style={{ ...styles.input, width, borderColor: errors[key] ? "#ff5555" : "rgba(255,255,255,0.1)" }}
      />
      {errors[key] && <span style={styles.error}>{errors[key]}</span>}
    </div>
  );

  return (
    <div style={styles.page}>

      {/* ── Header ── */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>⚙️ ADMIN — PRODUITS</h1>
          <p style={styles.subtitle}>{loading ? "Chargement..." : `${produits.length} produits au total`}</p>
        </div>
        <div style={styles.stats}>
          {CATEGORIES_ADMIN.map(cat => (
            <div key={cat} style={styles.statBadge}>
              <span style={styles.statNum}>{produits.filter(p => p.category === cat).length}</span>
              <span style={styles.statLabel}>{CATEGORY_LABELS[cat]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Formulaire d'ajout ── */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>➕ AJOUTER UN PRODUIT</h3>

        <div style={styles.categorySelector}>
          {CATEGORIES_ADMIN.map(cat => (
            <button key={cat} onClick={() => setForm({ ...form, category: cat })} style={{
              ...styles.catBtn,
              background: form.category === cat ? "linear-gradient(135deg,#00e6ff,#0077ff)" : "rgba(255,255,255,0.04)",
              color: form.category === cat ? "black" : "#888",
              border: `1px solid ${form.category === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
              fontWeight: form.category === cat ? "800" : "500",
            }}>
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div style={styles.formGrid}>
          {field("name", "Nom du produit")}
          {field("brand", "Marque")}
          {field("price", "Prix (TND)", "number", "130px")}
          {field("stock", "Stock initial", "number", "100px")}
          {showDates && field("prodDate", "Fabrication (MM/YYYY)", "text", "160px")}
          {showDates && field("expDate", "Expiration (MM/YYYY)", "text", "160px")}
        </div>

        {/* Upload image */}
        <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={styles.label}>Image du produit *</label>
          <div style={{
            border: `2px dashed ${errors.image ? "#ff5555" : "rgba(0,230,255,0.3)"}`,
            borderRadius: "12px", padding: "20px", textAlign: "center",
            background: "rgba(0,230,255,0.02)", cursor: "pointer",
          }}
            onClick={() => document.getElementById("imageInput").click()}
          >
            {imageFile ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                />
                <div style={{ textAlign: "left" }}>
                  <p style={{ color: "#00e6ff", margin: 0, fontSize: "13px", fontWeight: "700" }}>{imageFile.name}</p>
                  <p style={{ color: "#555", margin: 0, fontSize: "11px" }}>{(imageFile.size / 1024).toFixed(0)} KB</p>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); setImageFile(null); }}
                  style={{ background: "rgba(255,51,51,0.1)", border: "1px solid rgba(255,51,51,0.3)", color: "#ff5555", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", fontSize: "12px" }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div>
                <p style={{ color: "#555", margin: 0, fontSize: "13px" }}>📷 Cliquer pour choisir une image</p>
                <p style={{ color: "#333", margin: "4px 0 0", fontSize: "11px" }}>JPG, PNG, WEBP</p>
              </div>
            )}
          </div>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={e => { if (e.target.files[0]) setImageFile(e.target.files[0]); }}
          />
          {errors.image && <span style={styles.error}>{errors.image}</span>}
        </div>

        <div style={{ marginTop: "14px" }}>
          <label style={styles.label}>Description</label>
          <textarea
            placeholder="Description du produit..."
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={styles.textarea}
          />
        </div>

        <button onClick={handleAdd} style={styles.addBtn}>
          ✓ Ajouter dans "{CATEGORY_LABELS[form.category]}"
        </button>
      </div>

      {/* ── Filtres + Actions ── */}
      <div style={styles.toolbar}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => setFilterCat("all")} style={{ ...styles.filterBtn, background: filterCat === "all" ? "rgba(0,230,255,0.15)" : "transparent", color: filterCat === "all" ? "#00e6ff" : "#555", borderColor: filterCat === "all" ? "rgba(0,230,255,0.4)" : "rgba(255,255,255,0.08)" }}>
            Tous ({produits.length})
          </button>
          {CATEGORIES_ADMIN.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{
              ...styles.filterBtn,
              background: filterCat === cat ? "rgba(0,230,255,0.15)" : "transparent",
              color: filterCat === cat ? "#00e6ff" : "#555",
              borderColor: filterCat === cat ? "rgba(0,230,255,0.4)" : "rgba(255,255,255,0.08)",
            }}>
              {CATEGORY_LABELS[cat]} ({produits.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>
        {selectedIds.length > 0 && (
          <button onClick={handleDelete} style={styles.deleteBtn}>
            🗑 Supprimer {selectedIds.length} sélectionné{selectedIds.length > 1 ? "s" : ""}
          </button>
        )}
      </div>

      {/* ── Grille produits ── */}
      <div style={styles.grid}>
        {loading ? (
          <p style={{ color: "#444", textAlign: "center", marginTop: "40px" }}>Chargement des produits...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: "#444", textAlign: "center", marginTop: "40px" }}>Aucun produit dans cette catégorie.</p>
        ) : (
          filtered.map(p => (
            <div key={p.id} style={{ position: "relative" }}>
              <label style={{
                position: "absolute", top: "10px", left: "10px", zIndex: 10,
                background: selectedIds.includes(p.id) ? "rgba(255,51,51,0.2)" : "rgba(0,0,0,0.6)",
                border: `1px solid ${selectedIds.includes(p.id) ? "#ff5555" : "rgba(255,255,255,0.15)"}`,
                borderRadius: "8px", padding: "4px 10px", cursor: "pointer",
                fontSize: "11px", color: selectedIds.includes(p.id) ? "#ff5555" : "#aaa",
                backdropFilter: "blur(6px)", display: "flex", alignItems: "center", gap: "6px",
              }}>
                <input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => toggleSelect(p.id)} style={{ cursor: "pointer" }} />
                {selectedIds.includes(p.id) ? "Sélectionné" : "Sélectionner"}
              </label>

              {/* Badge catégorie */}
              <div style={{
                position: "absolute", top: "10px", right: "10px", zIndex: 10,
                background: "rgba(0,230,255,0.1)", border: "1px solid rgba(0,230,255,0.3)",
                color: "#00e6ff", borderRadius: "8px", padding: "3px 10px",
                fontSize: "10px", fontWeight: "700", letterSpacing: "1px",
              }}>
                {CATEGORY_LABELS[p.category] || p.category}
              </div>

              {/* Bouton update stock */}
              <button
                onClick={() => { setStockModal({ id: p.id, name: p.name, currentStock: p.stock }); setStockQty(""); }}
                style={{
                  position: "absolute", bottom: "60px", left: "50%", transform: "translateX(-50%)",
                  zIndex: 10, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,165,0,0.4)", color: "#ffa500",
                  borderRadius: "8px", padding: "5px 14px", cursor: "pointer",
                  fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap",
                }}
              >
                📦 Stock : {p.stock}
              </button>

              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>

      {/* ── Modal Update Stock ── */}
      {stockModal && (
        <div
          onClick={() => setStockModal(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)", zIndex: 3000, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#0d0d0d", border: "1px solid rgba(255,165,0,0.3)",
              borderRadius: "20px", padding: "32px", width: "340px",
              boxShadow: "0 0 60px rgba(255,165,0,0.1)",
            }}
          >
            <h3 style={{ color: "#ffa500", margin: "0 0 6px", fontSize: "16px", letterSpacing: "1px" }}>
              📦 METTRE À JOUR LE STOCK
            </h3>
            <p style={{ color: "#555", fontSize: "12px", margin: "0 0 20px" }}>{stockModal.name}</p>

            <div style={{ background: "rgba(255,165,0,0.06)", border: "1px solid rgba(255,165,0,0.2)", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#888", fontSize: "12px" }}>Stock actuel</span>
              <span style={{ color: "#ffa500", fontWeight: "900", fontSize: "18px" }}>{stockModal.currentStock}</span>
            </div>

            <label style={{ ...styles.label, marginBottom: "6px", display: "block" }}>
              Quantité à ajouter/retirer (ex: +10 ou -5)
            </label>
            <input
              type="number"
              placeholder="ex: 10 ou -5"
              value={stockQty}
              onChange={e => setStockQty(e.target.value)}
              style={{ ...styles.input, width: "100%", boxSizing: "border-box", marginBottom: "8px", borderColor: "rgba(255,165,0,0.3)" }}
            />

            {stockQty && !isNaN(stockQty) && (
              <p style={{ color: parseInt(stockQty) >= 0 ? "#55ff88" : "#ff7777", fontSize: "12px", margin: "0 0 16px" }}>
                Nouveau stock : {stockModal.currentStock + parseInt(stockQty)}
              </p>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleUpdateStock}
                disabled={stockLoading}
                style={{
                  flex: 1, background: "linear-gradient(135deg,#ffa500,#ff6b00)",
                  color: "black", border: "none", borderRadius: "10px", padding: "12px",
                  fontWeight: "800", fontSize: "13px", cursor: stockLoading ? "not-allowed" : "pointer",
                }}
              >
                {stockLoading ? "⏳..." : "✓ Confirmer"}
              </button>
              <button
                onClick={() => setStockModal(null)}
                style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "white", borderRadius: "10px", padding: "12px 16px", cursor: "pointer", fontSize: "13px",
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { background: "#000", minHeight: "100vh", padding: "40px 30px 80px", color: "white" },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    flexWrap: "wrap", gap: "20px", marginBottom: "36px",
    borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "28px",
  },
  title: { color: "#00e6ff", fontSize: "22px", letterSpacing: "3px", margin: "0 0 6px" },
  subtitle: { color: "#444", fontSize: "13px", margin: 0 },
  stats: { display: "flex", gap: "12px", flexWrap: "wrap" },
  statBadge: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "10px 18px", textAlign: "center" },
  statNum: { display: "block", color: "#00e6ff", fontSize: "20px", fontWeight: "900" },
  statLabel: { display: "block", color: "#555", fontSize: "11px", marginTop: "2px", letterSpacing: "1px" },
  section: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,230,255,0.1)", borderRadius: "20px", padding: "28px 24px", marginBottom: "28px" },
  sectionTitle: { color: "#888", fontSize: "12px", letterSpacing: "3px", margin: "0 0 20px" },
  categorySelector: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" },
  catBtn: { padding: "10px 20px", borderRadius: "25px", cursor: "pointer", fontSize: "13px", transition: "all 0.2s" },
  formGrid: { display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "flex-start" },
  label: { color: "#555", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" },
  input: { padding: "10px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "13px", outline: "none" },
  textarea: { width: "100%", padding: "12px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "13px", height: "70px", resize: "vertical", outline: "none", boxSizing: "border-box" },
  error: { color: "#ff5555", fontSize: "10px" },
  addBtn: { marginTop: "20px", background: "linear-gradient(135deg,#00e6ff,#0077ff)", color: "black", border: "none", borderRadius: "12px", padding: "13px 30px", fontWeight: "800", fontSize: "14px", cursor: "pointer", letterSpacing: "0.5px" },
  toolbar: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "28px" },
  filterBtn: { padding: "8px 16px", borderRadius: "20px", cursor: "pointer", fontSize: "12px", border: "1px solid", transition: "all 0.2s", fontWeight: "600" },
  deleteBtn: { background: "rgba(255,51,51,0.1)", color: "#ff5555", border: "1px solid rgba(255,51,51,0.3)", borderRadius: "10px", padding: "9px 20px", cursor: "pointer", fontWeight: "700", fontSize: "13px" },
  grid: { display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "flex-start" },
};

export default AdminProduits;