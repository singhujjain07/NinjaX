import express from 'express'
import { problemsByRatingController, ratingController, userInfoController } from '../controllers/forcesController.js';

// router object
const router = express.Router();

// get problems
router.get('/problems',problemsByRatingController); //working
router.get('/rating',ratingController) //working
router.get('/user-info',userInfoController)


export default router