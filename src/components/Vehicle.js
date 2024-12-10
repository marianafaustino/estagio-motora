import React, { useEffect, useState } from 'react';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('http://localhost:3000/vehicles'); 
                const data = await response.json();
                setVehicles(data);
            } catch (error) {
                console.error('Erro ao buscar dados dos veículos:', error);
            }
        };

        fetchVehicles();
    }, []);

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tipo</th>
                        <th scope="col" className="px-6 py-3">Placa</th>
                        <th scope="col" className="px-6 py-3">Latitude</th>
                        <th scope="col" className="px-6 py-3">Longitude</th>
                        <th scope="col" className="px-6 py-3">Velocidade</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{vehicle.type === 'car' ? 'CARRO' : vehicle.type === 'truck' ? 'CAMINHÃO' : vehicle.type === 'bus' ? 'ÔNIBUS' : vehicle.type}</td>
                            <td className="px-6 py-4">{vehicle.plate}</td>
                            <td className="px-6 py-4">{vehicle.lat}</td>
                            <td className="px-6 py-4">{vehicle.lng}</td>
                            <td className="px-6 py-4">{vehicle.speed}</td>
                            <td className="px-6 py-4">{vehicle.status === 'stopped' ? 'PARADO' : vehicle.status === 'moving' ? 'EM MOVIMENTO' : vehicle.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Vehicle;