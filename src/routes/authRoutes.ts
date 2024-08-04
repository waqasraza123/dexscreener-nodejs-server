import express from 'express';
import AuthController from '../controllers/authController';

const authRouter = express.Router();

// routes prefix is /api/auth
authRouter.post('/register', AuthController.register);
authRouter.post('/login', AuthController.login);

export default authRouter;