import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:5000";

const CATEGORY_CONFIG = {
  musculation: { icon: "💪", label: "MUSCULATION", sub: "Force & Performance", accent: "#00e6ff", to: "/video/musculation" },
  cardio:      { icon: "🏃", label: "CARDIO",      sub: "Endurance & HIIT",    accent: "#ff6b35", to: "/video/cardio" },
  healthfood:  { icon: "🥗", label: "NUTRITION",   sub: "Recettes & Plans",    accent: "#44ff88", to: "/video/healthfood" },
  mentalhealth:{ icon: "🧠", label: "BIEN-ÊTRE",   sub: "Mindset & Focus",     accent: "#b388ff", to: "/video/mentalhealth" },
};

function VideosCategory() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(`${API}/api/video/`, { credentials: "include" });
        const videos = await res.json();
        const c = {};
        if (Array.isArray(videos)) {
          videos.forEach(v => {
            const cat = v.category?.toLowerCase();
            if (cat) c[cat] = (c[cat] || 0) + 1;
          });
        }
        setCounts(c);
      } catch (err) {
        console.error("Erreur fetchCounts:", err);
      }
    };
    fetchCounts();
  }, []);

  const categories = Object.entries(CATEGORY_CONFIG).map(([key, cfg]) => ({
    ...cfg,
    count: `${counts[key] || 0} vidéo${(counts[key] || 0) !== 1 ? "s" : ""}`,
  }));

  return (
    <div style={styles.page}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={styles.title}>CATÉGORIES</h1>
        <p style={{ color: "#555", fontSize: "13px", letterSpacing: "2px" }}>
          CHOISISSEZ VOTRE PROGRAMME
        </p>
      </div>

      <div style={styles.grid}>
        {categories.map(cat => (
          <Link
            key={cat.to}
            to={cat.to}
            style={styles.card}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = `${cat.accent}55`;
              e.currentTarget.style.boxShadow = `0 25px 60px rgba(0,0,0,0.5), 0 0 40px ${cat.accent}18`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{
              position: "absolute", top: "-30px", left: "50%", transform: "translateX(-50%)",
              width: "120px", height: "120px", borderRadius: "50%",
              background: `radial-gradient(circle, ${cat.accent}20 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <span style={{ fontSize: "3.8rem", display: "block", marginBottom: "16px", filter: `drop-shadow(0 0 12px ${cat.accent}55)` }}>
              {cat.icon}
            </span>

            <h2 style={{ color: "white", margin: "0 0 6px", fontSize: "1.4rem", fontWeight: "900", letterSpacing: "2px" }}>
              {cat.label}
            </h2>
            <p style={{ color: "#666", margin: "0 0 6px", fontSize: "13px" }}>
              {cat.sub}
            </p>
            <span style={{
              color: cat.accent, fontSize: "11px", fontWeight: "700", letterSpacing: "1px",
              background: `${cat.accent}15`, border: `1px solid ${cat.accent}33`,
              borderRadius: "20px", padding: "3px 12px", display: "inline-block", marginBottom: "24px",
            }}>
              {cat.count}
            </span>

            <div style={{
              background: `linear-gradient(135deg, ${cat.accent}, ${cat.accent}aa)`,
              border: "none", padding: "12px 0", borderRadius: "12px",
              color: "black", width: "100%", fontWeight: "800", fontSize: "13px",
              letterSpacing: "1px", textAlign: "center", textTransform: "uppercase",
              boxShadow: `0 5px 20px ${cat.accent}44`,
            }}>
              DÉCOUVRIR
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    margin: 0, color: "white",
    background: "radial-gradient(circle at top left, rgba(63,0,107,0.4) 0%, rgba(0,0,0,1) 60%)",
    minHeight: "100vh", padding: "70px 20px", boxSizing: "border-box",
  },
  title: {
    fontSize: "3rem", fontWeight: "900", margin: "0 0 8px",
    letterSpacing: "4px", color: "white",
    textShadow: "0 4px 20px rgba(0,0,0,0.5)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "28px", maxWidth: "1100px", margin: "0 auto",
  },
  card: {
    background: "rgba(255,255,255,0.03)",
    padding: "44px 28px 32px",
    borderRadius: "26px",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.07)",
    textAlign: "center", textDecoration: "none", color: "white",
    transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
    display: "flex", flexDirection: "column", alignItems: "center",
    position: "relative", overflow: "hidden",
  },
};

export default VideosCategory;