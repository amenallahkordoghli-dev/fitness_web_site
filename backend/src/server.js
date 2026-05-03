import express from 'express';
import sequelize from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from "helmet";

// models
import User from './models/user.js';
import Product from './models/product.js';
import Video from './models/video.js';
import Cart from './models/Cart.js';
import CartItem from './models/CartItem.js';
import Order from './models/Order.js';
import OrderItem from './models/OrderItem.js';
import Training from './models/Training.js';
import UserTraining from './models/userTraining.js';
import Source from './models/source.js';
import CoachRequest from './models/CoachRequest.js';

// routes
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import userRoutes from './routes/userRoutes.js';
import calculeRoutes from './routes/calculeRoutes.js';
import sourceRoutes from './routes/sourceRoutes.js'
import requestRoutes from './routes/requestRoutes.js';

import { createAdmin } from './utils/createAdmin.js';

const app = express();
app.use(express.json());
// middlewares
app.use(helmet());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // Remplace par l'URL exacte de ton frontend
  credentials: true,               // Autorise l'envoi des cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//  RELATIONS (avant sync)
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

User.hasMany(Video);
Video.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

User.hasMany(UserTraining);
UserTraining.belongsTo(User);

Training.hasMany(UserTraining);
UserTraining.belongsTo(Training);

User.hasMany(Source);
Source.belongsTo(User);

User.hasMany(CoachRequest);
CoachRequest.belongsTo(User);

// routes
app.use('/auth',authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/video',videoRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/profile',userRoutes);
app.use('/api/calcul',calculeRoutes);
app.use('/api/source',sourceRoutes);
app.use('/api/coachRequest',requestRoutes);

// DB sync
sequelize.sync({ alter: true })
  .then(async () => {
    console.log("Tables créées ");
    await createAdmin();
  })
  .catch(err => console.log("erreur ", err));

// server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});