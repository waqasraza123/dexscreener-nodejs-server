import { Request, Response } from 'express';
import { magicLogin, magicTokenValidation } from '../../services/web3/magicService';

// Controller to handle sending the Magic Link
export const loginWithMagicLink = async (req: Request, res: Response) => {
  const email  =  'test@gmail.com'; //req.body

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  //try {
    // Call the service to log in via Magic Link
    const didToken = await magicLogin(email);

    // You can return the token or send it back to the frontend
    return res.status(200).json({ didToken });
//   } catch (error) {
//     return res.status(500).json({ error: 'Error logging in with Magic Link' });
//   }
};

// Controller to validate the Magic Token
export const validateMagicToken = async (req: Request, res: Response) => {
  const { didToken } = req.body;

  if (!didToken) {
    return res.status(400).json({ error: 'Token is required' });
  }

  try {
    // Validate the Magic Link token
    const metadata = await magicTokenValidation(didToken);

    // You can implement your own login/session logic here
    res.status(200).json({ message: 'Token is valid!', metadata });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired Magic Link' });
  }
};
