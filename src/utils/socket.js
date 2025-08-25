import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const socket = io(SOCKET_URL, {
    autoConnect: false, // Don't connect automatically
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Maximum number of reconnection attempts
    reconnectionDelay: 1000, // Delay between reconnection attempts in milliseconds
});

// Socket event listeners for connection status
socket.on('connect', () => {
    console.log('Connected to socket server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
});

socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
});

export default socket;
