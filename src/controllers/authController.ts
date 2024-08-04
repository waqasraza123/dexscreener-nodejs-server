import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export default new class AuthController {
	register = async (req: Request, res: Response): Promise<void> => {
		const { email, password } = req.body;
		const { user, error } = await registerUser(email, password);
		
		if (error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(201).json({ user });
		}
	};
	
	login = async (req: Request, res: Response): Promise<void> => {
		const { email, password } = req.body;
		const { user, error } = await loginUser(email, password);
		
		if (error) {
			res.status(400).json({ error: error.message });
		} else {
			res.status(200).json({ user });
		}
	};
}
