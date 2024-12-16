import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import FloatButton from '../components/FloatButton';
import ModalAdd from '../components/ModalAdd';

const Vehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [formData, setFormData] = useState({
        plate: '',
        type: '',
        lat: '',
        lng: '',
        speed: '',
        status: ''
    });

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
            setFormData({ plate: '', type: '', lat: '', lng: '', speed: '', status: '' });
            setIsModalOpen(false);
            setSelectedVehicle(null) 
        } catch (error) {
            console.error('Erro ao adicionar veículo:', error);
        }
    };

    const handleEditVehicle = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedData = Object.fromEntries(formData.entries());

        const updatedVehicle = { ...selectedVehicle, ...updatedData };

        try {
            const response = await fetch(`http://localhost:3000/vehicles/${selectedVehicle.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedVehicle),
            });

            if (!response.ok) {
                throw new Error('Erro ao editar veículo');
            }

            const newVehicles = vehicles.map(vehicle =>
                vehicle.id === selectedVehicle.id ? updatedVehicle : vehicle
            );
            setVehicles(newVehicles);
            setFormData({ plate: '', type: '', lat: '', lng: '', speed: '', status: '' });
            setIsModalOpen(false);
            setSelectedVehicle(null)
        } catch (error) {
            console.error('Erro ao editar veículo:', error);
        }
    };

    const handleDeleteVehicle = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/vehicles/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir veículo');
            }

            setVehicles((prevVehicles) => prevVehicles.filter(vehicle => vehicle.id !== id));
        } catch (error) {
            console.error('Erro ao excluir veículo:', error);
        }
    };

    const openEditModal = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsModalOpen(true);
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
                            <td className="px-6 py-4"><button>{<PencilSquareIcon className='text-gray h-6 w-6' onClick={() => openEditModal(vehicle)}/>}</button></td>
                            <td className="px-6 py-4"><button>{<TrashIcon className='text-gray h-6 w-6' onClick={() => handleDeleteVehicle(vehicle.id)}/>}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer>
                <FloatButton disabled={false} onClick={() => setIsModalOpen(true)}/>
            </Footer>
            <ModalAdd isOpen={isModalOpen} onClose={() => {
                setIsModalOpen(false)
                setFormData({ plate: '', type: '', lat: '', lng: '', speed: '', status: '' })
                setSelectedVehicle(null)}}>
                <h2 className="text-lg font-bold mb-4 text-motoraDarkBlue">
                    {selectedVehicle ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
                </h2>
                <form onSubmit={selectedVehicle ? handleEditVehicle : handleAddVehicle}>
                    <div className="mb-4">
                        <label htmlFor="plate" className="block text-sm font-medium text-motoraDarkBlue">Placa</label>
                        <input type="text" id="plate" name="plate" maxlength="7" required defaultValue={selectedVehicle?.plate || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                        
                        <label htmlFor="type" className="block text-sm font-medium text-motoraDarkBlue">Tipo</label>
                        <select
                        id="type"
                        name="type"
                        defaultValue={selectedVehicle?.status}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        >
                        <option value="bus">ÔNIBUS</option>
                        <option value="truck">CAMINHÃO</option>
                        <option value="car">CARRO</option>
                        </select>
                    
                        <label htmlFor="lat" className="block text-sm font-medium text-motoraDarkBlue">Latitude</label>
                        <input type="number" id="lat" name="lat" defaultValue={selectedVehicle?.lat || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    
                        <label htmlFor="lng" className="block text-sm font-medium text-motoraDarkBlue">Longitude</label>
                        <input type="number" id="lng" name="lng" defaultValue={selectedVehicle?.lng || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    
                        <label htmlFor="speed" className="block text-sm font-medium text-motoraDarkBlue">Velocidade</label>
                        <input type="number" id="speed" name="speed" maxlength="3" defaultValue={selectedVehicle?.speed || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    
                        <label htmlFor="status" className="block text-sm font-medium text-motoraDarkBlue">Status</label>
                        <select
                        id="status"
                        name="status"
                        defaultValue={selectedVehicle?.status}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        >
                        <option value="stopped">PARADO</option>
                        <option value="moving">EM MOVIMENTO</option>
                        </select>
                    </div>
                    <button type="submit" className="mt-2 w-full bg-motoraDarkBlue text-white rounded-md p-2 hover:bg-motoraLightBlue">
                        {selectedVehicle ? 'Salvar Alterações' : 'Adicionar'}
                    </button>
                </form>
            </ModalAdd>
        </div>
    );
};

export default Vehicle;