import { io } from 'socket.io-client';

const socketDrivers = io('http://localhost:3000/drivers/ws', {
    transports: ['websocket', 'polling'],
});

export default socketDrivers;