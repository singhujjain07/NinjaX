import express from 'express'
import { saveCodeController,fetchCodeController,updateCodeController,deleteCodeController } from '../controllers/codeController.js'

const router = express.Router();

router.post('/save-code',saveCodeController)
router.post('/fetch-code/:owner',fetchCodeController);
router.put('/update-code/:id',updateCodeController);
router.delete('/delete-code/:id',deleteCodeController);

export default router