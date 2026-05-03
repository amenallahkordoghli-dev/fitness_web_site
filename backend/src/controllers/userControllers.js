import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import fs from "fs";

export const getCoachs=async(req,res)=>{
    try{
        const coachs=await User.findAll({
            where:{role:"coach"},
            attributes:["id","firstName","email","phone","bio"]
        });
        if (!coachs || coachs.length === 0) {
        return res.status(404).json({ message: "Aucun coach trouvé" });
        }
        res.json(coachs);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}



export const getProfile = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "non autorisé" });
        }

        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: "utilisateur non trouvé" });
        }

        const userData = user.toJSON();

        // ✅ Cloudinary : déjà une URL complète
        userData.profilePhoto = user.profilePhoto;

        res.json(userData);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updatePassword =async (req,res)=>{
    try{
        const user=await User.findByPk(req.user.id);
        const {password,confirmPassword}=req.body;
        if(password !== confirmPassword){
            return res.status(400).json({message:"mot de passe incorrect"});
        }
        const hashedPassord=await bcrypt.hash(password,10);
        user.password=hashedPassord;
        await user.save();
        res.json({message:"mot de passe mis à jour"});
    }catch(error){
        res.status(500).json({message:error.message});

    }
}
export const updateProfileImage = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "utilisateur non trouvé" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "aucune image envoyée" });
        }

        // 🔥 Cloudinary retourne URL directe
        user.profilePhoto = req.file.path;

        await user.save();

        res.json({
            message: "image mise à jour",
            image: user.profilePhoto
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const { firstName, lastName, email,bio,phone} = req.body;

    user.firstName = firstName ?? user.firstName;
    user.lastName = lastName ?? user.lastName;
    user.email = email ?? user.email;
    user.bio = bio ?? user.bio;
    user.phone = phone ?? user.phone;
    await user.save();
    res.json({ message: "Profil mis à jour ✅", user });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};