import express from 'express';
import { loginWithMagicLink, validateMagicToken } from '../controllers/web3/magicController';


const router = express.Router();

// all routes are prefixed with /api/web3/magic

// Route to send Magic Link
router.get('/login', loginWithMagicLink);
//router.post('/login', loginWithMagicLink);

// Route to validate Magic Token (used in middleware or after the frontend sends the token)
router.post('/validate', validateMagicToken);

export default router;
