import sequelize from "../config/db.js";
import Product from "../models/product.js";
const seedProduct =async ()=>{
    try{
        await sequelize.authenticate();
        console.log("connexion DB réussie");
        await Product.bulkCreate([
            {
                name:"T-shirt Sukuna ",
                price:"50",
                marque:"iRaJ",
                category:"vetements",
                description:"Un t-shirt oversize au style vintage (acid wash) noir",
                image:"https://res.cloudinary.com/dtdnbgbrp/image/upload/v1778055092/Messenger_creation_1601D30A-C033-4C87-9A5C-F21D5172C452_uuyggu.jpg",
                stock:"10",
                prodDate:null,
                expDate:null,

            },
            {
                name:"Whey Protein ",
                price:"500",
                marque:" Optimum Nutrition",
                category:"protein",
                description:"Une poudre de protéines de lactosérum (whey) goût Cookies & Cream",
                image:"https://res.cloudinary.com/dtdnbgbrp/image/upload/v1778055076/Messenger_creation_584CB9A3-7436-41A3-A0D4-9003699BEEAE_pysqjx.jpg",
                stock:"15",
                prodDate:"11/12/2025",
                expDate:"10/12/2028"

            },
            {
                name:"Probiotiques",
                price:"200",
                marque:"Nutri&Co",
                category:"supplement",
                description:"Un complément alimentaire en gélules.9 souches de bactéries lactiques et de la vitamine D",
                image:"https://res.cloudinary.com/dtdnbgbrp/image/upload/v1778055063/Messenger_creation_EE394C51-746B-4670-945A-4687AC38B3B9_j0zh3n.jpg",
                stock:"5",
                prodDate:"05/04/2026",
                expDate:"10/12/2029"

            },
        ]);
        console.log("produits ajouter avec succés");
        process.exit(0);
        
    }catch(error){
            console.error("Erreur : ",error);
            process.exit(1);
        }

}
seedProduct();