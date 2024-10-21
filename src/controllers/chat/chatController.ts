import { Request, Response } from 'express';
import { saveMessageToSupabase, getMessagesFromSupabase } from '../../services/chat/chatService';

export default new class ChatController {
  // Save a message through REST API (optional since socket handles this in real-time)
  saveMessage = async (req: Request, res: Response): Promise<void> => {
    const { content, user } = req.body;

    try {
      const savedMessage = await saveMessageToSupabase({ content, user });
      res.status(201).json({ message: savedMessage });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save message' });
    }
  };

  // Get all chat messages
  getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const messages = await getMessagesFromSupabase();
      res.status(200).json({ messages });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve messages' });
    }
  };
}
