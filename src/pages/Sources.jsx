import './../styles/Sources.css'
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { useState, useEffect, useContext } from "react";

// Logo
function Logo() {
  return (
    <img src="https://img.freepik.com/vecteurs-libre/conception-modele-logo-scientifique_23-2150337869.jpg" alt="logo" />
  )
}

// Card
function Card({key,source }) {

  if (!source) return null

  let domain = "invalid link"

  try {
    domain = new URL(source.link).hostname
  } catch (e) {
    console.error("Erreur lien :", source.link)
  }

  return (
    <div className="source-card">
      <div className="source-header">
        <div className="source-logo">
          <Logo />
        </div>

        <div className="source-title-box">
          <div className="source-title">{source.titre}</div>
          <div className="source-category">{source.category}</div>
        </div>
      </div>

      <div className="source-description">
        {source.description}
      </div>

      <div className="source-footer">
        <div className="source-link">🔗 {domain}</div>

        <a
          href={source.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-consult"
        >
          Consulter →
        </a>
      </div>
    </div>
  )
}


export default  function  Sources() {
  const { showNotification } = useContext(NotificationContext);
  const [sources, setSources] = useState([]);
     useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/source/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "import sources failed");
        }

        setSources(data.sources);

      } catch (error) {
        showNotification(error.message);
      }
    };

    fetchSources();
  }, []);
function Header(){
  return(
    <div class="page-header">
      <h2>recherche scientifique</h2>
      <p>
        Nos recommandations en matière de fitness et nutrition sont fondées sur
        des recherches scientifiques solides provenant des sources les plus
        fiables au monde
      </p>
    </div>
  )
}
function Info(){
  return(
    <div class="info-box">
        <strong>🔬 Engagement Scientifique :</strong> Nous nous engageons à
        fournir des informations basées sur les meilleures preuves scientifiques
        disponibles. Chaque source citée a été soigneusement vérifiée pour sa
        crédibilité, sa pertinence et son actualité.
      </div>
  )
}
  return (
    <div>
      <Header />
      <Info />
    
    <div class="sources-grid">
      {sources.map((source, index) => (
        <Card key={index} source={source} />
      ))}
    </div>
    </div>
  )
}