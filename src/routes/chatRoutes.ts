import { Router } from 'express';
import ChatController from '../controllers/chat/chatController';

const chatRouter = Router();

chatRouter.post('/save', ChatController.saveMessage);
chatRouter.get('/messages', ChatController.getMessages);

export default chatRouter;
