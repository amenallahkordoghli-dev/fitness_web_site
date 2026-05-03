import CoachRequest from "../models/CoachRequest.js";
import User from "../models/user.js";
export const requestCoach=async(req,res)=>{
    try{
        const {message}=req.body;

        //evite doublement
        const exist = await CoachRequest.findOne({
            where:{UserId:req.user.id , status:"pending"}
        });
        if(exist){
            return res.status(400).json({ message: "Vous avez déjà une demande en attente" });

        }
        const request = await CoachRequest.create({
            UserId:req.user.id,
            message
        });
        res.status(201).json({
        message: "demande envoyée"
        });

    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export const getRequests=async(req,res)=>{
    try{
    const requests = await CoachRequest.findAll({
    include: {
        model: User,
        attributes: ["firstName", "email"]
    },
    attributes: ["id", "status", "message"]
});
    res.json(requests);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export const approveRequest = async (req, res) => {
    try {
        const request = await CoachRequest.findByPk(req.params.id);

        if (!request) {
            return res.status(404).json({ message: "demande non trouvée" });
        }

        request.status = "approved";
        await request.save();

        const user = await User.findByPk(request.UserId);

        if (!user) {
            return res.status(404).json({ message: "utilisateur non trouvé" });
        }

        user.role = "coach";
        await user.save(); // 🔥 TRÈS IMPORTANT

        res.json({ message: "user devient coach" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const rejectRequest = async (req, res) => {
    try {
        const request = await CoachRequest.findByPk(req.params.id);

        if (!request) {
            return res.status(404).json({ message: "demande non trouvée" });
        }

        request.status = "rejected";
        await request.save();

        res.json({ message: "demande refusée" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};