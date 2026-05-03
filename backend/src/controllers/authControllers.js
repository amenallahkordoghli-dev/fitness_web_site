import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import {generateToken} from './../utils/generateToken.js'


const register = async (req, res) => {
    try {
        
        const { firstName, lastName, email, password ,bio,phone} = req.body;

        // vérifier email existant
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "email déjà utilisé" });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // image (si uploadée)
        let profilePhoto = null;
        if (req.file) {
            profilePhoto = req.file.path; // Cloudinary URL
        }

        // créer user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profilePhoto,
            bio,
            phone
        });

        const token = generateToken(user, res);

        res.status(201).json({
        message: "utilisateur créé",
        user,
        token
});

    } catch (error) {
    console.log(error.message); 
    res.status(500).json({ message: error.message });
}
};
const login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        //verifier user
        const user=await User.findOne({where:{email}});
        if(!user){
            return res.status(400).json({message:"user not found"});

        }
        //compare password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"mot de passe incorrect"});

        }
        // créer token
        const token=generateToken(user,res);

    res.json({ message: "Login réussi",  user ,token});

    }catch(error){
        res.status(500).json({ error: error.message });
    }
}
const logout =(req,res)=>{
    res.clearCookie("token");
    res.json({message:"deconnecté"});
}
export {register,login,logout}