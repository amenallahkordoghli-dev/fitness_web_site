import React, { useState, useEffect } from "react";

const API = "http://localhost:5000";

const CATEGORY_CONFIG = {
  musculation: { title: "💪 Musculation", accent: "#00e6ff" },
  cardio:      { title: "🏃 Cardio",      accent: "#ff6b35" },
  healthfood:  { title: "🥗 Nutrition",   accent: "#44ff88" },
  mentalhealth:{ title: "🧠 Bien-être",   accent: "#b388ff" },
};

function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    category: "musculation",
    title: "",
    description: "",
    url: "",
    duration: "",
  });

  // ── Fetch toutes les vidéos ──
  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/video/`, { credentials: "include" });
      const data = await res.json();
      setVideos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur fetchVideos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  // ── Ajouter vidéo ──
  const handleAdd = async () => {
    if (!form.title || !form.url) return alert("Veuillez remplir le titre et l'URL");
    try {
      const res = await fetch(`${API}/api/video/`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          duration: form.duration ? parseInt(form.duration) : null,
          category: form.category.toLowerCase(),
        }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Erreur lors de l'ajout");
      await fetchVideos();
      setForm({ ...form, title: "", description: "", url: "", duration: "" });
    } catch (err) {
      console.error("Erreur handleAdd:", err);
      alert("Erreur réseau");
    }
  };

  // ── Supprimer vidéo ──
  const handleDelete = async (num) => {
    if (!window.confirm("Supprimer cette vidéo ?")) return;
    try {
      const res = await fetch(`${API}/api/video/${num}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Erreur lors de la suppression");
      await fetchVideos();
    } catch (err) {
      console.error("Erreur handleDelete:", err);
      alert("Erreur réseau");
    }
  };

  // Grouper par catégorie
  const grouped = Object.keys(CATEGORY_CONFIG).reduce((acc, cat) => {
    acc[cat] = videos.filter(v => v.category?.toLowerCase() === cat);
    return acc;
  }, {});

  // Convertir secondes → mm:ss
  const formatDuration = (sec) => {
    if (!sec) return "N/A";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.container}>
      <h1 style={{ marginBottom: "30px", fontSize: "2rem", fontWeight: "300", color: "white" }}>
        Gestionnaire <span style={{ color: "#00e6ff" }}>Vidéos</span>
        <span style={{ color: "#555", fontSize: "1rem", marginLeft: "12px" }}>
          {loading ? "..." : `${videos.length} vidéos`}
        </span>
      </h1>

      {/* ── Formulaire d'ajout ── */}
      <div style={styles.card}>
        <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#00e6ff", letterSpacing: "2px", fontSize: "13px" }}>
          ➕ AJOUTER UNE VIDÉO
        </h3>

        {/* Sélection catégorie */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
          {Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setForm({ ...form, category: key })}
              style={{
                padding: "10px 18px", borderRadius: "25px", cursor: "pointer",
                fontSize: "12px", fontWeight: form.category === key ? "800" : "500",
                background: form.category === key ? `linear-gradient(135deg, ${cfg.accent}, ${cfg.accent}99)` : "rgba(255,255,255,0.04)",
                color: form.category === key ? "black" : "#888",
                border: `1px solid ${form.category === key ? "transparent" : "rgba(255,255,255,0.08)"}`,
                transition: "all 0.2s",
              }}
            >
              {cfg.title}
            </button>
          ))}
        </div>

        <div style={styles.gridForm}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={styles.label}>Titre *</label>
            <input style={styles.input} placeholder="Titre de la vidéo" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <label style={styles.label}>Durée (secondes)</label>
            <input style={styles.input} type="number" placeholder="ex: 720" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", gridColumn: "span 2" }}>
            <label style={styles.label}>URL Vidéo (.mp4) *</label>
            <input style={styles.input} placeholder="http://... ou /videos/..." value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", gridColumn: "span 2" }}>
            <label style={styles.label}>Description</label>
            <input style={styles.input} placeholder="Description courte..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>

        <button
          onClick={handleAdd}
          style={styles.addBtn}
          onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}
        >
          ✓ Enregistrer la vidéo
        </button>
      </div>

      {/* ── Liste par catégories ── */}
      {loading ? (
        <p style={{ color: "#555", textAlign: "center", marginTop: "40px" }}>Chargement...</p>
      ) : (
        Object.entries(CATEGORY_CONFIG).map(([cat, cfg]) => (
          <div key={cat} style={{ marginBottom: "40px" }}>
            <h2 style={{
              borderBottom: `1px solid rgba(255,255,255,0.07)`, paddingBottom: "12px",
              color: "white", fontSize: "16px", fontWeight: "700", letterSpacing: "1px",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <span style={{ color: cfg.accent }}>{cfg.title}</span>
              <span style={{
                background: `${cfg.accent}18`, border: `1px solid ${cfg.accent}44`,
                color: cfg.accent, borderRadius: "20px", padding: "2px 10px", fontSize: "11px", fontWeight: "700",
              }}>
                {grouped[cat].length} vidéo{grouped[cat].length !== 1 ? "s" : ""}
              </span>
            </h2>

            <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {grouped[cat].length === 0 ? (
                <p style={{ color: "#444", fontSize: "13px" }}>Aucune vidéo dans cette catégorie.</p>
              ) : (
                grouped[cat].map(v => (
                  <div key={v.num} style={{ ...styles.videoItem, borderLeftColor: cfg.accent }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <strong style={{ display: "block", color: "white", fontSize: "14px", marginBottom: "4px" }}>
                        {v.title}
                      </strong>
                      {v.description && (
                        <p style={{ color: "#666", fontSize: "12px", margin: "0 0 4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {v.description}
                        </p>
                      )}
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span style={{ fontSize: "11px", color: cfg.accent, background: `${cfg.accent}15`, border: `1px solid ${cfg.accent}33`, borderRadius: "10px", padding: "2px 8px" }}>
                          ⏱ {formatDuration(v.duration)}
                        </span>
                        <span style={{ fontSize: "11px", color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "300px" }}>
                          {v.url}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(v.num)}
                      style={styles.deleteBtn}
                      onMouseOver={e => e.currentTarget.style.background = "rgba(255,51,51,0.25)"}
                      onMouseOut={e => e.currentTarget.style.background = "rgba(255,51,51,0.1)"}
                    >
                      🗑 Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 30px 80px", backgroundColor: "#000",
    minHeight: "100vh", color: "#e0e0e0",
  },
  card: {
    background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,230,255,0.1)",
    borderRadius: "20px", padding: "28px 24px", marginBottom: "36px",
  },
  gridForm: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "14px", marginBottom: "20px",
  },
  label: { color: "#555", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" },
  input: {
    padding: "11px 14px", borderRadius: "10px",
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
    color: "white", fontSize: "13px", outline: "none",
  },
  addBtn: {
    background: "linear-gradient(135deg,#00e6ff,#0077ff)",
    color: "black", border: "none", borderRadius: "12px",
    padding: "13px 30px", fontWeight: "800", fontSize: "14px",
    cursor: "pointer", letterSpacing: "0.5px", transition: "opacity 0.2s",
  },
  videoItem: {
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px",
    padding: "16px 18px", background: "rgba(255,255,255,0.03)",
    borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)",
    borderLeft: "4px solid",
  },
  deleteBtn: {
    background: "rgba(255,51,51,0.1)", color: "#ff5555",
    border: "1px solid rgba(255,51,51,0.3)", borderRadius: "8px",
    padding: "8px 14px", cursor: "pointer", fontWeight: "700",
    fontSize: "12px", flexShrink: 0, transition: "background 0.2s",
  },
};

export default AdminVideos;