import express from 'express';
import {authMiddleware } from '../middleware/authMiddleware.js';
import {calculateCalories,getHistory} from '../controllers/calculateCalories.js'
const route =express.Router();

route.post('/', authMiddleware, calculateCalories);
route.get('/history',authMiddleware,getHistory)

export default route;