import express from 'express';
import {adminMiddleware} from '../middleware/adminMiddleware.js';
import {authMiddleware} from '../middleware/authMiddleware.js';
import {requestCoach,getRequests,approveRequest,rejectRequest} from '../controllers/coachController.js';
const route =express.Router();
//user
route.post('/request',authMiddleware,requestCoach);

//admin
route.get('/requests',authMiddleware,adminMiddleware,getRequests);
route.put('/approve/:id',authMiddleware,adminMiddleware,approveRequest);
route.put('/reject/:id',authMiddleware,adminMiddleware,rejectRequest);
export default route;