import bcrypt from "bcryptjs";
import User from "./../models/user.js";
export const createAdmin=async()=>{
    try{
    const adminEmail="admin@test.com";
    const existingAdmin=await User.findOne({where:{email:adminEmail}});
    if(!existingAdmin){
    const hashedPassword=await bcrypt.hash("admin123",10);
    await User.create({
        firstName:"admin",
        lastName:"System",
        email:adminEmail,
        password:hashedPassword,
        role:"admin",
        profilePhoto:"img.PNG"
    });
    console.log("admin cree avec succee");
    }
    }
    catch(error){
        console.log(error);
    }
}

