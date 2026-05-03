import sequelize from "../config/db.js";
import Source from "../models/source.js";
const seedSources=async()=>{
    try{
    await sequelize.authenticate();
    console.log("connexion DB réussie");
    await Source.bulkCreate([
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
            },
        ]);
        console.log("training ajouter avec succés");
        process.exit(0);
        }catch(error){
            console.error("Erreur : ",error);
            process.exit(1);
        }


}
seedSources();