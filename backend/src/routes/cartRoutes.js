import express from 'express';
import {getCart,addToCart,checkout,getInvoice,removeFromCart} from '../controllers/cartControllers.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
const route =express.Router();

route.get('/',authMiddleware,getCart);
route.post('/',authMiddleware,addToCart);
route.post('/checkout',authMiddleware,checkout);
route.get('/invoice/:id',authMiddleware,getInvoice);
route.delete('/',authMiddleware,removeFromCart);
export default route;