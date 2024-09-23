import { Request, Response } from 'express';
import { getPrediction } from '../../services/openai/predictionService';

export const predictTokenPerformance = async (req: Request, res: Response) => {
  try {
    const { tokens } = req.body;  // Expect tokens data in request body
    if (!tokens || !Array.isArray(tokens)) {
      return res.status(400).json({ message: 'Invalid request. "tokens" must be an array.' });
    }

    const predictions = await getPrediction(tokens);
    res.status(200).json({ predictions });
  } catch (error: any) {
    res.status(500).json({ message: 'Error predicting token performance', error: error.message });
  }
};
