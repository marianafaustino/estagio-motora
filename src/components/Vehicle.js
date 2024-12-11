import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import FloatButton from './FloatButton';
import ModalAdd from './ModalAdd';

const Vehicle = (stylevh) => {
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleAddVehicle = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const newVehicle = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/vehicles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVehicle),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar veículo');
            }

            const addedVehicle = await response.json();
            setVehicles((prevVehicles) => [...prevVehicles, addedVehicle]); 
            setIsModalOpen(false); 
        } catch (error) {
            console.error('Erro ao adicionar veículo:', error);
        }
    };


    return (
        <div className="relative overflow-x-auto" style={{height: "70vh"}}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Tipo</th>
                        <th scope="col" className="px-6 py-3">Placa</th>
                        <th scope="col" className="px-6 py-3">Latitude</th>
                        <th scope="col" className="px-6 py-3">Longitude</th>
                        <th scope="col" className="px-6 py-3">Velocidade</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
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
                            <td className="px-6 py-4">{<PencilSquareIcon/>}</td>
                            <td className="px-6 py-4">{<TrashIcon/>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer>
                <FloatButton disabled={false} onClick={() => setIsModalOpen(true)}/>
            </Footer>
            <ModalAdd isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-bold mb-4 text-motoraDarkBlue">Adicionar Novo Veículo</h2>
                <form onSubmit={handleAddVehicle}>
                    <div className="mb-4">
                        <label htmlFor="plate" className="block text-sm font-medium text-motoraDarkBlue">Placa</label>
                        <input type="text" id="plate" name="plate" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                        <label htmlFor="type" className="block text-sm font-medium text-motoraDarkBlue">Tipo</label>
                        <input type="text" id="type" name="type" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <button type="submit" className="mt-2 w-full bg-motoraDarkBlue text-white rounded-md p-2 hover:bg-motoraLightBlue">Adicionar</button>
                </form>
            </ModalAdd>
        </div>
    );
};

export default Vehicle;