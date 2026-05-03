import React, { useState } from "react";
import ProductCard from "./Produitcart";

/**
 * Composant admin GÉNÉRIQUE — remplace :
 *   GestionProtein, GestionNutri, GestionNutri2, GestionEquip (vetements + materiel)
 *
 * Props :
 *   title      — titre affiché (ex: "Protéines")
 *   category   — slug de catégorie (ex: "protein")
 *   initialProducts — tableau initial de produits (depuis data.js filtré)
 *   showDates  — true pour afficher champs prod/exp (protein, creatine)
 */
function GestionProduits({ title, category, initialProducts = [], showDates = false }) {
  const [produits, setProduits] = useState(initialProducts);
  const [form, setForm] = useState({ id: "", name: "", brand: "", description: "", image: "", price: "", prodDate: "", expDate: "" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.id.trim()) e.id = "ID requis";
    if (!form.name.trim()) e.name = "Nom requis";
    if (!form.price || isNaN(form.price)) e.price = "Prix invalide";
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
      category,
    }]);
    setForm({ id: "", name: "", brand: "", description: "", image: "", price: "", prodDate: "", expDate: "" });
    setErrors({});
  };

  const handleDelete = () => {
    setProduits(produits.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  const toggleSelect = (id) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const field = (key, placeholder, type = "text") => (
    <div style={{ display: "inline-flex", flexDirection: "column", margin: "5px" }}>
      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => setForm({ ...form, [key]: e.target.value })}
        style={{
          ...inputStyle,
          borderColor: errors[key] ? "#ff5555" : "rgba(255,255,255,0.1)",
        }}
      />
      {errors[key] && <span style={{ color: "#ff5555", fontSize: "10px", marginTop: "2px" }}>{errors[key]}</span>}
    </div>
  );

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>⚙️ GESTION — {title.toUpperCase()}</h1>

      {/* Formulaire d'ajout */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>➕ AJOUTER UN PRODUIT</h3>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {field("id", "ID Produit (ex: p3)")}
          {field("name", "Nom du produit")}
          {field("brand", "Marque")}
          {field("image", "URL Image")}
          {field("price", "Prix (TND)", "number")}
          {showDates && field("prodDate", "Fabrication (MM/YYYY)")}
          {showDates && field("expDate", "Expiration (MM/YYYY)")}
        </div>
        <div style={{ marginTop: "10px" }}>
          <textarea
            placeholder="Description du produit"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            style={{ ...inputStyle, width: "400px", height: "60px", resize: "vertical" }}
          />
        </div>
        <button onClick={handleAdd} style={styles.addBtn}>✓ Ajouter</button>
      </div>

      {/* Bouton suppression groupée */}
      {selectedIds.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <button onClick={handleDelete} style={styles.deleteBtn}>
            🗑 Supprimer {selectedIds.length} produit{selectedIds.length > 1 ? "s" : ""} sélectionné{selectedIds.length > 1 ? "s" : ""}
          </button>
        </div>
      )}

      {/* Grille produits */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {produits.length === 0 ? (
          <p style={{ color: "#555", marginTop: "40px" }}>Aucun produit dans cette catégorie.</p>
        ) : (
          produits.map(p => (
            <div key={p.id} style={{ position: "relative" }}>
              {/* Checkbox sélection */}
              <label style={{
                position: "absolute", top: "10px", left: "10px", zIndex: 10,
                background: selectedIds.includes(p.id) ? "rgba(255,51,51,0.2)" : "rgba(0,0,0,0.5)",
                border: `1px solid ${selectedIds.includes(p.id) ? "#ff5555" : "rgba(255,255,255,0.2)"}`,
                borderRadius: "6px", padding: "3px 8px", cursor: "pointer",
                fontSize: "11px", color: selectedIds.includes(p.id) ? "#ff5555" : "white",
                backdropFilter: "blur(4px)",
              }}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p.id)}
                  onChange={() => toggleSelect(p.id)}
                  style={{ marginRight: "4px", cursor: "pointer" }}
                />
                {selectedIds.includes(p.id) ? "Sélectionné" : "Sélectionner"}
              </label>
              <ProductCard product={p} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px 14px", width: "170px", borderRadius: "8px",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
  color: "white", fontSize: "13px", outline: "none",
};

const styles = {
  page: { background: "#000", minHeight: "100vh", padding: "40px 20px", color: "white", textAlign: "center" },
  title: { color: "#00e6ff", fontSize: "22px", letterSpacing: "3px", marginBottom: "30px" },
  section: {
    background: "rgba(255,255,255,0.03)", padding: "24px 20px",
    borderRadius: "18px", marginBottom: "30px",
    border: "1px solid rgba(0,230,255,0.1)",
  },
  sectionTitle: { color: "#888", fontSize: "13px", letterSpacing: "2px", marginBottom: "16px" },
  addBtn: {
    marginTop: "16px", background: "linear-gradient(135deg,#00e6ff,#0077ff)",
    color: "black", border: "none", borderRadius: "10px", padding: "12px 32px",
    fontWeight: "800", fontSize: "14px", cursor: "pointer", letterSpacing: "1px",
  },
  deleteBtn: {
    background: "rgba(255,51,51,0.15)", color: "#ff5555",
    border: "1px solid rgba(255,51,51,0.4)", borderRadius: "10px",
    padding: "10px 24px", cursor: "pointer", fontWeight: "700", fontSize: "13px",
  },
};

export default GestionProduits;