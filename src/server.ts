require('dotenv').config();
import app from './app';
import { createServer } from 'http';
import { initializeSocket } from './socket';

const server = createServer(app);

const PORT: string | number = process.env.PORT || 9000;

// Initialize Socket.IO
initializeSocket(server);

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});