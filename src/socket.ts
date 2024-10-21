import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { saveMessageToSupabase } from './services/chat/chatService';

export const initializeSocket = (server: HttpServer) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    // Join a chat room based on the contract address
    socket.on('joinChat', (data) => {
      const contractAddress = data.contract_address;
      socket.join(contractAddress); // Join the room
      console.log(`Socket ${socket.id} joined room: ${contractAddress}`);
    });

    // Listen for chat messages
    socket.on('sendMessage', async (messageData) => {
        console.log(messageData); // Log the received message data
        try {
            // Save the message in Supabase using API
            //await saveMessageToSupabase(messageData);
        
            // Check if contract_address is valid before sending
            if (messageData.contract_address) {
                console.log("received message");
                // Broadcast the message to clients in the specific room
                io.to(messageData.contract_address).emit('receiveMessage', messageData);
            } else {
                console.error('No contract address provided in messageData');
            }
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });
  

    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  });
};
