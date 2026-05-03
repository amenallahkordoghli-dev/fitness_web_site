import React, { useState } from "react";
import { videoData as initialData } from "./videoData";

function AdminVideos() {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({
    category: "musculation",
    title: "",
    description: "",
    vid: "",
    thumb: "",
    duration: "",
  });

  const handleAdd = () => {
    if (!form.title || !form.vid) return alert("Veuillez remplir le titre et l'URL");
    const newVideo = { id: Date.now().toString(), ...form };
    setData(prev => ({
      ...prev,
      [form.category]: {
        ...prev[form.category],
        videos: [...prev[form.category].videos, newVideo],
      },
    }));
    setForm({ ...form, title: "", description: "", vid: "", thumb: "", duration: "" });
  };

  const handleDelete = (category, id) => {
    if (window.confirm("Supprimer cette vidéo ?")) {
      setData(prev => ({
        ...prev,
        [category]: { ...prev[category], videos: prev[category].videos.filter(v => v.id !== id) },
      }));
    }
  };

  // --- STYLES ---
  const styles = {
    container: { padding: "40px", backgroundColor: "#121212", minHeight: "100vh", color: "#e0e0e0", fontFamily: "'Segoe UI', sans-serif" },
    card: { backgroundColor: "#1e1e1e", padding: "24px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", marginBottom: "30px" },
    gridForm: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "20px" },
    input: { padding: "12px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#2d2d2d", color: "white", outline: "none" },
    buttonAdd: { padding: "12px 24px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "0.3s" },
    videoItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px", backgroundColor: "#2d2d2d", borderRadius: "8px", marginBottom: "10px", borderLeft: "4px solid #007bff" },
    btnDelete: { backgroundColor: "#dc3545", color: "white", border: "none", padding: "8px 14px", borderRadius: "4px", cursor: "pointer" },
    badge: { fontSize: "0.8rem", color: "#888", marginLeft: "10px" }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: "30px", fontSize: "2rem", fontWeight: "300" }}>Gestionnaire <span style={{ color: "#007bff" }}>Vidéos</span></h1>

      {/* FORMULAIRE D'AJOUT */}
      <div style={styles.card}>
        <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Ajouter une nouvelle vidéo</h3>
        <div style={styles.gridForm}>
          <select style={styles.input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option value="musculation">Musculation</option>
            <option value="cardio">Cardio</option>
            <option value="healthfood">Nutrition</option>
            <option value="mentalhealth">Bien-être</option>
          </select>
          <input style={styles.input} placeholder="Titre de la vidéo" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <input style={styles.input} placeholder="Durée (ex: 12:00)" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
          <input style={styles.input} placeholder="URL Vidéo (.mp4)" value={form.vid} onChange={e => setForm({ ...form, vid: e.target.value })} />
          <input style={styles.input} placeholder="Lien Image (Thumbnail)" value={form.thumb} onChange={e => setForm({ ...form, thumb: e.target.value })} />
          <input style={{ ...styles.input, gridColumn: "span 2" }} placeholder="Description courte..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>
        <button 
          style={styles.buttonAdd} 
          onClick={handleAdd}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
        >
          Enregistrer la vidéo
        </button>
      </div>

      {/* LISTE PAR CATÉGORIES */}
      {Object.keys(data).map(cat => (
        <div key={cat} style={{ marginBottom: "40px" }}>
          <h2 style={{ borderBottom: "2px solid #333", paddingBottom: "10px", textTransform: "capitalize" }}>
            {data[cat].title} <span style={{ color: "#666", fontSize: "1rem" }}>({data[cat].videos.length})</span>
          </h2>

          <div style={{ marginTop: "20px" }}>
            {data[cat].videos.length === 0 && <p style={{ color: "#666" }}>Aucune vidéo dans cette catégorie.</p>}
            {data[cat].videos.map(v => (
              <div key={v.id} style={styles.videoItem}>
                <div>
                  <strong style={{ display: "block" }}>{v.title}</strong>
                  <span style={styles.badge}>{v.duration || "N/A"}</span>
                </div>
                <button 
                  style={styles.btnDelete} 
                  onClick={() => handleDelete(cat, v.id)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminVideos;
