import sequelize from "../config/db.js";
import Training from "../models/Training.js";   
const seedTrainings=async()=>{
    try{
        await sequelize.authenticate();
        console.log("connexion DB réussie");
        const count =await Training.count();
        if(count>0){
            console.log(("les données existent déja"));
            return;
        }
        await Training.bulkCreate([
            {name:"Running(Low intensity)",met:1.3},
            {name:"Running(moderate)",met:1.6},
            {name:"Running(high intensity)",met:2.0},
            {name:"walking",met:1.2},
            {name:"cycling(moderate)",met:1.8 },
            {name:"swiming(high intensity)",met:2.2},
            {name:"swimming(moderate)",met:1.5},
            {name:"swiming(intense)",met:2.1},
            {name:"weight training",met:1.7},
            {name:"HIIT(high intensity)",met:1.9},
            {name:"yoga/Pilate",met:1.4},
            {name:"boxing",met:1.8}
        ]);
        console.log("training ajouter avec succés");
        process.exit(0);

    }catch(error){
        console.error("Erreur : ",error);
        process.exit(1);
    }
};
seedTrainings();