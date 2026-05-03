import express from 'express';
import {getProfile,updateProfile,updatePassword,updateProfileImage,getCoachs} from '../controllers/userControllers.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';
const route =express.Router();

route.get('/',authMiddleware,getProfile);
route.put('/',authMiddleware,updateProfile);
route.put('/password',authMiddleware,updatePassword);
route.put(
    "/image",
    authMiddleware,
    upload.single("image"),
    updateProfileImage
);
route.get('/coachs',getCoachs);
export default route;