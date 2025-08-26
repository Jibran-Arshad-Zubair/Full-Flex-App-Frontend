import { io } from 'socket.io-client';
const SOCKET_URL = 'http://localhost:5000';
export const socket = io(SOCKET_URL, {
    autoConnect: false, 
    reconnection: true, 
    reconnectionAttempts: 5, 
    reconnectionDelay: 1000, 
});


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
