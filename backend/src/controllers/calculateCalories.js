import Training from "../models/Training.js";
import User from "../models/user.js";
import UserTraining from "../models/userTraining.js";

export const calculateCalories=async(req,res)=>{
    try{
        const {TrainingId,duration,weight,height,intensity} =req.body;
        if(!TrainingId || !duration || ! weight || !height || !intensity){
            return res.status(400).json({messge:"champs manquants"});
        
        }
        const training =await Training.findByPk(TrainingId);
        if(!training){
            return res.status(404).json({message:"exercice non trouvé"});
        }
        const calories = Math.round((training.met * weight * duration * intensity) / 60);
    const protein = Math.round(weight * 1.6);
    const totalCalories = calories * 1.5;
    const carbs = Math.round((totalCalories * 0.5) / 4);
    const fat = Math.round((totalCalories * 0.25) / 9);
    //save history
    const record =await UserTraining.create({
        UserId:req.user.id,
        TrainingId,
        duration,
        weight,
        height,
        intensity,
        calories,
        protein,
        carbs,
        fat
    });
    res.status(200).json({calories,
        protein,
        carbs,
        fat
    });
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
export const getHistory=async (req,res)=>{
    try{
        const history=await UserTraining.findAll({
            where:{UserId:req.user.id},
            include:{
                model:Training,
                attributes:["name"]
            },
            order:[["createdAt","DESC"]]
        });
        res.json(history);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export const getTrining=async (req,res)=>{
    try{
        const training= await Training.findAll();
        if (training.length === 0) {
            return res.status(404).json({ message: "not found" });
            }
        res.json(training)
    }catch(error){
        res.status(500).json({message:error.message});
    }
}