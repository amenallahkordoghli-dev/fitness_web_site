import './../styles/Sources.css'


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


export default function Sources() {
    const sources = [
{
  titre: "PubMed Central",
  category: "Base de Données Médicale",
  description: "Plus grande base de données de la littérature biomédicale et de la vie avec des millions d'articles de recherche évalués par les pairs",
  link: "https://pubmed.ncbi.nlm.nih.gov"
},
{
  titre: "Journal of Sports Sciences",
  category: "Revue Scientifique",
  description: "Revue en ligne leader publiant des recherches de haut niveau sur la physiologie de l'exercice et l'entraînement sportif.",
  link: "https://www.tandfonline.com/doi/full/10.1080/02640414.2023.2229537"
},
{
  titre: "Medicine & Science in Sports & Exercise",
  category: "Revue Clinique",
  description: "Journal officiel de l'American College of Sports Medicine, autorité reconnue en médecine du sport.",
  link: "https://journals.lww.com/acsm-msse/pages/default.aspx"
},
{
  titre: "Journal of the International Society of Sports Nutrition",
  category: "Revue Nutrition",
  description: "Publication officielle couvrant les recommandations nutritionnelles pour les athlètes.",
  link: "https://jissn.biomedcentral.com/"
},
{
  titre: "Nutrients Journal",
  category: "Revue Spécialisée",
  description: "Journal multidisciplinaire couvrant tous les aspects de la science nutritionnelle.",
  link: "https://www.mdpi.com/journal/nutrients"
}
]
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