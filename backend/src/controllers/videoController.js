
import User from '../models/user.js';
import Video from '../models/video.js';
const createVideo=async(req,res)=>{
    try{
    const video =await Video.create(
       { ...req.body,
        UserId:req.user.id
    });
    res.status(201).json({messge:"video crée avec succée ",video});
}catch(error){
        res.status(500).json({message:error.message});
}


}
const getAllVideo=async(req,res)=>{
    try{
        const video=await Video.findAll();
        res.json(video);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const deleteVideo=async(req,res)=>{
    try{
        const video=await Video.findByPk(req.params.num);
        if(!video){
            return res.status(404).json({message:"video not found "});
        }
        await video.destroy();
        res.json({message:"video destroy avec succée "});

    }catch(error){
        res.status(500).json({message:error.message});
    }
}
const getVideoByCategory=async(req,res)=>{
    try{
        const {category}=req.params;
        const videos =await Video.findAll({
          where:{ category: category.toLowerCase()}
        });
        res.json(videos);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
export {createVideo,getAllVideo,deleteVideo,getVideoByCategory};