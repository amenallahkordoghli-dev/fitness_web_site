import express from 'express';
import {adminMiddleware} from '../middleware/adminMiddleware.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import {createSource,getAllSources} from '../controllers/SourceControllers.js';
const route =express.Router();
route.post('/',authMiddleware,adminMiddleware,createSource);
route.get('/',getAllSources);
export default route;