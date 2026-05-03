import React, { useState } from "react";
import ProductCard from "./Produitcart";
import initialData, { CATEGORY_LABELS } from "./data";

const CATEGORIES_ADMIN = ["protein", "creatine", "supplement", "materiel", "vetements"];

function AdminProduits() {
  const [produits, setProduits] = useState(initialData);
  const [filterCat, setFilterCat] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [form, setForm] = useState({
    id: "", name: "", brand: "", description: "",
    image: "", price: "", category: "protein",
    prodDate: "", expDate: "",
  });
  const [errors, setErrors] = useState({});

  const showDates = form.category === "protein" || form.category === "creatine";

  const validate = () => {
    const e = {};
    if (!form.id.trim()) e.id = "Requis";
    if (!form.name.trim()) e.name = "Requis";
    if (!form.price || isNaN(form.price) || parseFloat(form.price) <= 0) e.price = "Prix invalide";
    if (produits.find(p => p.id === form.id)) e.id = "ID déjà utilisé";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = () => {
    if (!validate()) return;
    setProduits([...produits, {
      ...form,
      price: parseFloat(form.price),
      stock: 10,
    }]);
    setForm({ id: "", name: "", brand: "", description: "", image: "", price: "", category: form.category, prodDate: "", expDate: "" });
    setErrors({});
  };

  const handleDelete = () => {
    setProduits(produits.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
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
          <p style={styles.subtitle}>{produits.length} produits au total</p>
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

        {/* Sélection catégorie — bien visible en premier */}
        <div style={styles.categorySelector}>
          {CATEGORIES_ADMIN.map(cat => (
            <button
              key={cat}
              onClick={() => setForm({ ...form, category: cat })}
              style={{
                ...styles.catBtn,
                background: form.category === cat ? "linear-gradient(135deg,#00e6ff,#0077ff)" : "rgba(255,255,255,0.04)",
                color: form.category === cat ? "black" : "#888",
                border: `1px solid ${form.category === cat ? "transparent" : "rgba(255,255,255,0.08)"}`,
                fontWeight: form.category === cat ? "800" : "500",
              }}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Champs du formulaire */}
        <div style={styles.formGrid}>
          {field("id", "ID Produit")}
          {field("name", "Nom du produit")}
          {field("brand", "Marque")}
          {field("price", "Prix (TND)", "number", "130px")}
          {field("image", "URL Image", "file", "250px")}
          {showDates && field("prodDate", "Fabrication (MM/YYYY)", "text", "160px")}
          {showDates && field("expDate", "Expiration (MM/YYYY)", "text", "160px")}
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
          <button
            onClick={() => setFilterCat("all")}
            style={{ ...styles.filterBtn, background: filterCat === "all" ? "rgba(0,230,255,0.15)" : "transparent", color: filterCat === "all" ? "#00e6ff" : "#555", borderColor: filterCat === "all" ? "rgba(0,230,255,0.4)" : "rgba(255,255,255,0.08)" }}
          >
            Tous ({produits.length})
          </button>
          {CATEGORIES_ADMIN.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              style={{
                ...styles.filterBtn,
                background: filterCat === cat ? "rgba(0,230,255,0.15)" : "transparent",
                color: filterCat === cat ? "#00e6ff" : "#555",
                borderColor: filterCat === cat ? "rgba(0,230,255,0.4)" : "rgba(255,255,255,0.08)",
              }}
            >
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
        {filtered.length === 0 ? (
          <p style={{ color: "#444", gridColumn: "1/-1", textAlign: "center", marginTop: "40px" }}>
            Aucun produit dans cette catégorie.
          </p>
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
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p.id)}
                  onChange={() => toggleSelect(p.id)}
                  style={{ cursor: "pointer" }}
                />
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

              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#000", minHeight: "100vh",
    padding: "40px 30px 80px", color: "white",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    flexWrap: "wrap", gap: "20px", marginBottom: "36px",
    borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "28px",
  },
  title: { color: "#00e6ff", fontSize: "22px", letterSpacing: "3px", margin: "0 0 6px" },
  subtitle: { color: "#444", fontSize: "13px", margin: 0 },
  stats: { display: "flex", gap: "12px", flexWrap: "wrap" },
  statBadge: {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px", padding: "10px 18px", textAlign: "center",
  },
  statNum: { display: "block", color: "#00e6ff", fontSize: "20px", fontWeight: "900" },
  statLabel: { display: "block", color: "#555", fontSize: "11px", marginTop: "2px", letterSpacing: "1px" },

  section: {
    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,230,255,0.1)",
    borderRadius: "20px", padding: "28px 24px", marginBottom: "28px",
  },
  sectionTitle: { color: "#888", fontSize: "12px", letterSpacing: "3px", margin: "0 0 20px" },

  categorySelector: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" },
  catBtn: {
    padding: "10px 20px", borderRadius: "25px", cursor: "pointer",
    fontSize: "13px", letterSpacing: "0.5px", transition: "all 0.2s",
  },

  formGrid: { display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "flex-start" },
  label: { color: "#555", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" },
  input: {
    padding: "10px 14px", borderRadius: "10px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "white", fontSize: "13px", outline: "none",
  },
  textarea: {
    width: "100%", padding: "12px 14px", borderRadius: "10px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "white", fontSize: "13px", height: "70px", resize: "vertical",
    outline: "none", boxSizing: "border-box",
  },
  error: { color: "#ff5555", fontSize: "10px" },
  addBtn: {
    marginTop: "20px",
    background: "linear-gradient(135deg,#00e6ff,#0077ff)",
    color: "black", border: "none", borderRadius: "12px",
    padding: "13px 30px", fontWeight: "800", fontSize: "14px",
    cursor: "pointer", letterSpacing: "0.5px",
  },

  toolbar: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    flexWrap: "wrap", gap: "12px", marginBottom: "28px",
  },
  filterBtn: {
    padding: "8px 16px", borderRadius: "20px", cursor: "pointer",
    fontSize: "12px", border: "1px solid", transition: "all 0.2s", fontWeight: "600",
  },
  deleteBtn: {
    background: "rgba(255,51,51,0.1)", color: "#ff5555",
    border: "1px solid rgba(255,51,51,0.3)", borderRadius: "10px",
    padding: "9px 20px", cursor: "pointer", fontWeight: "700", fontSize: "13px",
  },
  grid: {
    display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "flex-start",
  },
};

export default AdminProduits;