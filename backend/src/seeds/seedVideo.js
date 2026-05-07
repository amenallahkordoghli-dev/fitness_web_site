import sequelize from "../config/db.js";
import Video from "../models/video.js";
const seedVideo =async ()=>{
    try{
        await sequelize.authenticate();
        console.log("connexion DB réussie");
        await Video.bulkCreate([
            {
                title:"Leg workout",
                url:"https://res.cloudinary.com/dtdnbgbrp/video/upload/v1777098403/518b58e7-9e09-46aa-a4bd-2a40dec7997e_gsetmg.mp4",
                description:"how to improve your Leg muscle",
                duration:"9",
                category:"musculation",

            },
            {
                title:"chest workout",
                url:"https://res.cloudinary.com/dtdnbgbrp/video/upload/v1777098445/ba238a23-dbb2-4855-8683-c7b034dd6173_vqzzmc.mp4",
                description:"how to improve your chest muscle",
                duration:"11",
                category:"musculation",
            },
            {
                title:"cardio workout",
                url:"https://res.cloudinary.com/dtdnbgbrp/video/upload/v1777820567/Messenger_creation_B638733E-40CE-4FA8-8A12-FA4DC39727FC_hmdin0.mp4",
                description:"how to lose fat",
                duration:"26",
                category:"cardio",
            },
            {
                title:"take decision",
                url:"https://res.cloudinary.com/dtdnbgbrp/video/upload/v1777820601/Messenger_creation_7B24A7A8-404D-4363-AB4B-3D9E8A049B1D_gpkb9t.mp4",
                description:"how to improve yourself",
                duration:"14",
                category:"mentalhealth",
            },
            {
                title:"Getting rid of procrastination",
                url:"https://res.cloudinary.com/dtdnbgbrp/video/upload/v1777820626/Messenger_creation_AE8D4D5D-D646-443D-96CC-2EC2D025A49C_pk2udl.mp4",
                description:"Are you tired of putting things off? In this video, we share simple and practical tips to help you beat procrastination and  boost your focus",
                duration:"16",
                category:"mentalhealth",
            },
            {
                title:"suppliments",
                url:"https://res.cloudinary.com/dtdnbgbrp/video/upload/v1777820740/Messenger_creation_311C9818-A8CB-4492-9685-0599B85C6254_g8o2jk.mp4",
                description:"Wondering which supplements are actually worth it? In this video, we break down the basics of the most effective supplements to help you boost your energy",
                duration:"15",
                category:"healthfood",
            },
        ]);
        console.log("videos ajouter avec succés");
        process.exit(0);
        
    }catch(error){
            console.error("Erreur : ",error);
            process.exit(1);
        }

}
seedVideo();