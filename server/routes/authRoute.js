import express from 'express'
import { loginController, registerController, updateCfController, updateLcController,updateProfileController } from '../controllers/authController.js';
import { requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// register
router.post('/register',registerController);

// login
router.post('/login',loginController)

// update lcid
router.put('/update-lc',requireSignIn,updateLcController)

// update cfid
router.put('/update-cf',requireSignIn,updateCfController)

// update profile
router.put('/update-profile',requireSignIn,updateProfileController)

export default router