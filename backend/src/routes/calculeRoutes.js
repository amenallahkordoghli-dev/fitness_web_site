import express from 'express';
import {authMiddleware } from '../middleware/authMiddleware.js';
import {calculateCalories,getHistory,getTrining} from '../controllers/calculateCalories.js'
const route =express.Router();

route.post('/', authMiddleware, calculateCalories);
route.get('/history',authMiddleware,getHistory);
route.get('/training',getTrining);

export default route;