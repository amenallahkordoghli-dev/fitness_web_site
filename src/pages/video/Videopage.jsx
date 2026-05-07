import React, { useState, useEffect } from "react";

const API = "http://localhost:5000";

/**
 * Props :
 *   category — clé catégorie ex: "musculation", "cardio", "healthfood", "mentalhealth"
 *   title    — titre affiché (ex: "💪 MUSCULATION")
 *   accent   — couleur d'accentuation (défaut: #00e6ff)
 */
function VideoPage({ category, title, accent = "#00e6ff" }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!category) return;
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/video/category/${category}`, { credentials: "include" });
        const data = await res.json();
        setVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Erreur fetchVideos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [category]);
  // Détecter si l'URL est YouTube
const isYoutube = (url) => {
  return url?.includes("youtube.com") || url?.includes("youtu.be");
};

// Convertir URL YouTube normale en URL embed
const getEmbedUrl = (url) => {
  if (!url) return "";
  // https://www.youtube.com/watch?v=XXXX  →  https://www.youtube.com/embed/XXXX
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/").split("&")[0];
  }
  // https://youtu.be/XXXX  →  https://www.youtube.com/embed/XXXX
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

  // Convertir durée (secondes INTEGER) en mm:ss
  const formatDuration = (seconds) => {
    if (!seconds) return null;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h1 style={{ ...styles.title, color: accent }}>{title}</h1>
        <p style={{ color: "#555", fontSize: "13px", letterSpacing: "2px" }}>
          {loading ? "CHARGEMENT..." : `${videos.length} VIDÉO${videos.length !== 1 ? "S" : ""}`}
        </p>
      </div>

      {/* Grille */}
      <div style={styles.grid}>
        {loading ? (
          <p style={{ color: "#444", textAlign: "center", gridColumn: "1/-1", marginTop: "40px" }}>
            Chargement des vidéos...
          </p>
        ) : videos.length === 0 ? (
          <p style={{ color: "#444", textAlign: "center", gridColumn: "1/-1", marginTop: "40px" }}>
            Aucune vidéo dans cette catégorie.
          </p>
        ) : (
          videos.map((v, i) => (
            <div
              key={v.num}
              onClick={() => setSelected(v)}
              style={{ ...styles.card, animationDelay: `${i * 0.08}s` }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.borderColor = `${accent}55`;
                e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Thumbnail */}
              <div style={styles.thumbZone}>
                <div style={{ ...styles.thumbPlaceholder, background: `radial-gradient(circle, ${accent}18 0%, #000 70%)` }}>
                  <span style={{ fontSize: "44px" }}>▶</span>
                </div>
                {/* Play overlay */}
                <div style={styles.playOverlay}>
                  <div style={{ ...styles.playBtn, borderColor: accent, boxShadow: `0 0 30px ${accent}55` }}>
                    <span style={{ color: accent, fontSize: "22px", marginLeft: "4px" }}>▶</span>
                  </div>
                </div>
                {/* Duration badge */}
                {v.duration && (
                  <span style={styles.durationBadge}>{formatDuration(v.duration)}</span>
                )}
              </div>

              {/* Info */}
              <div style={{ padding: "18px 20px 20px" }}>
                <h3 style={{ color: "white", margin: "0 0 8px", fontSize: "16px", fontWeight: "700" }}>
                  {v.title}
                </h3>
                {v.description && (
                  <p style={{ color: "#666", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>
                    {v.description}
                  </p>
                )}
                <div style={{ marginTop: "14px" }}>
                  <span style={{
                    background: `${accent}18`, border: `1px solid ${accent}44`,
                    color: accent, borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: "700",
                  }}>
                    ▶ REGARDER
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal vidéo */}
      {selected && (
        <div onClick={() => setSelected(null)} style={styles.backdrop}>
          <div onClick={e => e.stopPropagation()} style={styles.modal}>
            {/* Modal header */}
            <div style={styles.modalHeader}>
              <div>
                <h2 style={{ color: accent, margin: "0 0 4px", fontSize: "20px", fontWeight: "900" }}>
                  {selected.title}
                </h2>
                {selected.description && (
                  <p style={{ color: "#777", margin: 0, fontSize: "13px" }}>{selected.description}</p>
                )}
              </div>
              <button onClick={() => setSelected(null)} style={styles.closeBtn}>×</button>
            </div>

            {/* Video player */}
            <div style={styles.videoWrapper}>
              {isYoutube(selected.url) ? (
                <iframe
                  key={selected.num}
                  src={getEmbedUrl(selected.url)}
                  style={{ width: "100%", maxHeight: "450px", height: "450px", display: "block", border: "none" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video controls autoPlay style={styles.videoPlayer} key={selected.num}>
                  <source src={selected.url} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              )}
            </div>

            {/* Navigation entre vidéos */}
            <div style={styles.modalNav}>
              {videos.map(v => (
                <div
                  key={v.num}
                  onClick={() => setSelected(v)}
                  style={{
                    ...styles.navThumb,
                    borderColor: selected.num === v.num ? accent : "rgba(255,255,255,0.08)",
                    background: selected.num === v.num ? `${accent}15` : "rgba(255,255,255,0.03)",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>▶</span>
                  <span style={{
                    fontSize: "11px", color: selected.num === v.num ? accent : "#888",
                    fontWeight: selected.num === v.num ? "700" : "400",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>
                    {v.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    padding: "60px 20px 80px", minHeight: "100vh",
    background: "radial-gradient(circle at top left, rgba(63,0,107,0.4) 0%, rgba(0,0,0,1) 60%)",
    color: "white", boxSizing: "border-box",
  },
  title: { fontSize: "2.6rem", fontWeight: "900", margin: "0 0 6px", letterSpacing: "3px", textTransform: "uppercase" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "28px", maxWidth: "1100px", margin: "0 auto" },
  card: {
    background: "rgba(255,255,255,0.03)", borderRadius: "22px",
    border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)",
    cursor: "pointer", overflow: "hidden",
    transition: "transform 0.25s, border-color 0.25s, box-shadow 0.25s",
  },
  thumbZone: { width: "100%", height: "190px", position: "relative", overflow: "hidden", background: "#0a0a0a" },
  thumbPlaceholder: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" },
  playOverlay: {
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(0,0,0,0.35)",
  },
  playBtn: {
    width: "58px", height: "58px", borderRadius: "50%", border: "2px solid",
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
  },
  durationBadge: {
    position: "absolute", bottom: "10px", right: "10px",
    background: "rgba(0,0,0,0.75)", color: "white",
    borderRadius: "6px", padding: "3px 8px", fontSize: "11px", fontWeight: "700",
  },
  backdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
    zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
  },
  modal: {
    background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "24px",
    maxWidth: "800px", width: "100%", boxShadow: "0 0 80px rgba(0,0,0,0.9)",
    overflow: "hidden", maxHeight: "90vh", display: "flex", flexDirection: "column",
  },
  modalHeader: {
    padding: "22px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    background: "rgba(255,255,255,0.02)",
  },
  closeBtn: {
    background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
    color: "white", width: "38px", height: "38px", borderRadius: "50%",
    cursor: "pointer", fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  videoWrapper: { background: "#000", flexShrink: 0 },
  videoPlayer: { width: "100%", maxHeight: "450px", display: "block" },
  modalNav: {
    display: "flex", gap: "10px", padding: "16px 20px",
    overflowX: "auto", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.4)",
  },
  navThumb: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
    padding: "10px 14px", borderRadius: "12px", border: "1px solid",
    cursor: "pointer", transition: "all 0.2s", flexShrink: 0, minWidth: "90px", maxWidth: "110px",
  },
};

export default VideoPage;