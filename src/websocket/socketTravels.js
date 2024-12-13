import { io } from 'socket.io-client';

const socketTravels = io('http://localhost:3000/travels/ws', {
    transports: ['websocket', 'polling'],
});

export default socketTravels;
