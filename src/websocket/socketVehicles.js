import { io } from 'socket.io-client';

const socketVehicles = io('http://localhost:3000/vehicles/ws', {
    transports: ['websocket', 'polling'],
});

export default socketVehicles;