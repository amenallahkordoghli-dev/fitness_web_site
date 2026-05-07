import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

function AdminCoachRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => { fetchRequests(); }, []);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/coachRequest/requests`, {
        credentials: "include",
      });
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch (err) {
      showNotification("Erreur chargement ⚠️");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Promouvoir cet utilisateur en tant que Coach ?")) return;
    try {
      const res = await fetch(`${API}/api/coachRequest/approve/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      showNotification(data.message || "Coach validé ✅");
      fetchRequests();
    } catch {
      showNotification("Erreur validation ⚠️");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Rejeter cette demande ?")) return;
    try {
      const res = await fetch(`${API}/api/coachRequest/reject/${id}`, {
        method: "PUT",
        credentials: "include",
      });
      const data = await res.json();
      showNotification(data.message || "Demande refusée ❌");
      fetchRequests();
    } catch {
      showNotification("Erreur refus ⚠️");
    }
  };

  const pendingRequests = requests.filter(r => r.status === "pending");

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2 style={styles.title}>Demandes <span style={{ color: "#00ff88" }}>Coachs</span></h2>
        <div style={styles.statsBadge}>{pendingRequests.length} en attente</div>
      </div>

      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Récupération des candidatures...</p>
        </div>
      )}

      {!loading && requests.length === 0 && (
        <div style={styles.emptyState}>
          <p style={{ color: "#555", textAlign: "center", marginTop: "80px" }}>
            Aucune demande de coach pour le moment. ☕
          </p>
        </div>
      )}

      <div style={styles.grid}>
        {requests.map(req => (
          <div key={req.id} style={{
            ...styles.card,
            borderColor: req.status === "approved" ? "rgba(0,255,136,0.2)"
                       : req.status === "rejected"  ? "rgba(255,68,68,0.2)"
                       : "#222",
          }}>
            <div style={styles.cardHeader}>
              <div style={{
                ...styles.avatar,
                background: req.status === "approved" ? "#00ff88"
                           : req.status === "rejected"  ? "#ff4444"
                           : "#00e6ff",
              }}>
                {req.User?.firstName?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h3 style={styles.userName}>{req.User?.firstName || "Anonyme"}</h3>
                <p style={styles.userEmail}>{req.User?.email}</p>
              </div>
              {/* Badge statut */}
              <span style={{
                marginLeft: "auto", fontSize: "11px", fontWeight: "700", padding: "3px 10px",
                borderRadius: "20px",
                background: req.status === "approved" ? "rgba(0,255,136,0.1)"
                           : req.status === "rejected"  ? "rgba(255,68,68,0.1)"
                           : "rgba(255,200,0,0.1)",
                color: req.status === "approved" ? "#00ff88"
                     : req.status === "rejected"  ? "#ff4444"
                     : "#ffc800",
                border: `1px solid ${req.status === "approved" ? "rgba(0,255,136,0.3)"
                                    : req.status === "rejected"  ? "rgba(255,68,68,0.3)"
                                    : "rgba(255,200,0,0.3)"}`,
              }}>
                {req.status === "approved" ? "✓ Approuvé"
               : req.status === "rejected"  ? "✗ Refusé"
               : "⏳ En attente"}
              </span>
            </div>

            <div style={styles.messageBox}>
              <strong style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase" }}>
                Lettre de motivation
              </strong>
              <p style={styles.messageText}>
                {req.message || "Aucun message fourni."}
              </p>
            </div>

            {/* Actions — seulement si pending */}
            {req.status === "pending" && (
              <div style={styles.actions}>
                <button
                  style={{ ...styles.btn, ...styles.approve }}
                  onClick={() => handleApprove(req.id)}
                  onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseOut={e => e.currentTarget.style.opacity = "1"}
                >
                  ✓ Approuver
                </button>
                <button
                  style={{ ...styles.btn, ...styles.reject }}
                  onClick={() => handleReject(req.id)}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,68,68,0.15)"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}
                >
                  ✗ Rejeter
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {notification && (
        <div style={styles.notification}>{notification}</div>
      )}
    </div>
  );
}

export default AdminCoachRequests;

const styles = {
  page: {
    padding: "40px 10%", backgroundColor: "#0d0d0d",
    minHeight: "100vh", color: "#f0f0f0",
  },
  header: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    marginBottom: "40px", borderBottom: "1px solid #222", paddingBottom: "20px",
  },
  title: { fontSize: "2rem", margin: 0, fontWeight: "700" },
  statsBadge: {
    backgroundColor: "#1a1a1a", padding: "8px 16px",
    borderRadius: "20px", fontSize: "0.9rem",
    border: "1px solid #333", color: "#00ff88",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "25px",
  },
  card: {
    backgroundColor: "#161616", borderRadius: "16px", padding: "24px",
    border: "1px solid #222", transition: "border-color 0.2s",
    display: "flex", flexDirection: "column", justifyContent: "space-between",
  },
  cardHeader: {
    display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px",
  },
  avatar: {
    width: "45px", height: "45px", borderRadius: "12px",
    color: "#000", display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "bold", fontSize: "1.2rem", flexShrink: 0,
  },
  userName: { margin: 0, fontSize: "1.1rem" },
  userEmail: { margin: 0, color: "#666", fontSize: "0.85rem" },
  messageBox: {
    backgroundColor: "#0a0a0a", padding: "15px",
    borderRadius: "10px", marginBottom: "20px", minHeight: "80px",
  },
  messageText: {
    margin: "8px 0 0 0", color: "#ccc",
    fontSize: "0.9rem", lineHeight: "1.5", fontStyle: "italic",
  },
  actions: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  btn: {
    padding: "10px", border: "none", borderRadius: "8px",
    cursor: "pointer", fontWeight: "600", fontSize: "0.9rem", transition: "opacity 0.2s",
  },
  approve: { backgroundColor: "#00ff88", color: "#000" },
  reject: {
    backgroundColor: "transparent", color: "#ff4444",
    border: "1px solid #ff4444",
  },
  loadingContainer: { textAlign: "center", marginTop: "100px", color: "#666" },
  spinner: {
    width: "40px", height: "40px",
    border: "4px solid #1a1a1a", borderTopColor: "#00ff88",
    borderRadius: "50%", margin: "0 auto 20px",
    animation: "spin 1s linear infinite",
  },
  notification: {
    position: "fixed", bottom: "30px", right: "30px",
    backgroundColor: "#00ff88", color: "#000",
    padding: "12px 24px", borderRadius: "8px", fontWeight: "bold",
    boxShadow: "0 10px 30px rgba(0,255,136,0.2)", zIndex: 1000,
  },
};