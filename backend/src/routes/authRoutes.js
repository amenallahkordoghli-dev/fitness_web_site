import express from 'express';
import { register } from '../controllers/authControllers.js';
import { login,logout } from '../controllers/authControllers.js';
import { upload } from '../middleware/upload.js';
import {protect} from '../middleware/protect.js';
const route =express.Router();

route.post(
    "/register",
    upload.single("image"), // Cloudinary upload
    register
);
route.get("/me", protect, (req, res) => {
  res.json(req.user);
});
route.post('/login',login);
route.post('/logout',logout);

export default route;