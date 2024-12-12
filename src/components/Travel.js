import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import FloatButton from './FloatButton';
import ModalAdd from './ModalAdd';

const Travel = () => {
    const [travels, setTravels] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTravel, setselectedTravel] = useState(null);
    const [formData, setFormData] = useState({
        driverId: '',
        vehicleId: '',
        start: '',
        end: '',
        status: ''
    });

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const response = await fetch('http://localhost:3000/travels'); 
                const data = await response.json();
                setTravels(data);
            } catch (error) {
                console.error('Erro ao buscar dados das viagens:', error);
            }
        };

        fetchTravels();
    }, []);

    
    const handleAddTravel = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const newTravel = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/travels', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTravel),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar viagem');
            }

            const addedtravelr = await response.json();
            setTravels((prevtravels) => [...prevtravels, addedtravelr]); 
            setFormData({ driverId: '', vehicleId: '', start: '', end: '', status: '' });
            setIsModalOpen(false); 
        } catch (error) {
            console.error('Erro ao adicionar viagem:', error);
        }
    };

    const handleEditTravel = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedData = Object.fromEntries(formData.entries());

        const updatedtravelr = { ...selectedTravel, ...updatedData };

        try {
            const response = await fetch(`http://localhost:3000/travels/${selectedTravel.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedtravelr),
            });

            if (!response.ok) {
                throw new Error('Erro ao editar motorista');
            }

            const newtravels = travels.map(travel =>
                travel.id === selectedTravel.id ? updatedtravelr : travel
            );
            setTravels(newtravels);
            setFormData({ driverId: '', vehicleId: '', start: '', end: '', status: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao editar motorista:', error);
        }
    };

    const handleDeletetravel = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/travels/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir motorista');
            }

            setTravels((prevtravels) => prevtravels.filter(travel => travel.id !== id));
        } catch (error) {
            console.error('Erro ao excluir motorista:', error);
        }
    };

    const openEditModal = (travel) => {
        setselectedTravel(travel);
        setIsModalOpen(true);
    };

    return (
        <div className="revehicleIdive overflow-x-auto" style={{height: "70vh"}}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Motorista</th>
                        <th scope="col" className="px-6 py-3">Veículo</th>
                        <th scope="col" className="px-6 py-3">Início</th>
                        <th scope="col" className="px-6 py-3">Final</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {travels.map((travel, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{travel.driverId}</td>
                            <td className="px-6 py-4">{travel.vehicleId}</td>
                            <td className="px-6 py-4">{travel.start}</td>
                            <td className="px-6 py-4">{travel.end}</td>
                            <td className="px-6 py-4">{travel.status === 'ongoing' ? 'EM ANDAMENTO' : travel.status === 'finished' ? 'FINALIZADA' : travel.status}</td>
                            <td className="px-6 py-4"><button>{<PencilSquareIcon className='text-gray h-6 w-6' onClick={() => openEditModal(travel)}/>}</button></td>
                            <td className="px-6 py-4"><button>{<TrashIcon className='text-gray h-6 w-6' onClick={() => handleDeletetravel(travel.id)}/>}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer>
                <FloatButton disabled={false} onClick={() => setIsModalOpen(true)}/>
            </Footer>
            <ModalAdd isOpen={isModalOpen} onClose={() => {
                setIsModalOpen(false)
                setFormData({ driverId: '', vehicleId: '', start: '', end: '', status: '' })
                setselectedTravel(null)}}>
                <h2 className="text-lg font-bold mb-4 text-motoraDarkBlue">
                    {selectedTravel ? 'Editar Motorista' : 'Adicionar Novo Motorista'}
                </h2>
                <form onSubmit={selectedTravel ? handleEditTravel : handleAddTravel}>
                    <div className="mb-4">
                        <label htmlFor="driverId" className="block text-sm font-medium text-motoraDarkBlue">Motorista</label>
                        <input type="number" id="driverId" name="driverId" required defaultValue={selectedTravel?.driverId || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                        
                        <label htmlFor="vehicleId" className="block text-sm font-medium text-motoraDarkBlue">Veículo</label>
                        <input type="number" id="vehicleId" name="vehicleId" defaultValue={selectedTravel?.vehicleId || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    
                        <label htmlFor="start" className="block text-sm font-medium text-motoraDarkBlue">Início</label>
                        <input type="text" id="start" name="start" defaultValue={selectedTravel?.start || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                        
                        <label htmlFor="end" className="block text-sm font-medium text-motoraDarkBlue">Final</label>
                        <input type="text" id="end" name="end" defaultValue={selectedTravel?.end || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    
                        <label htmlFor="status" className="block text-sm font-medium text-motoraDarkBlue">Status</label>
                        <input type="text" id="status" name="status" defaultValue={selectedTravel?.status || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <button type="submit" className="mt-2 w-full bg-motoraDarkBlue text-white rounded-md p-2 hover:bg-motoraLightBlue">
                        {selectedTravel ? 'Salvar Alterações' : 'Adicionar'}
                    </button>
                </form>
            </ModalAdd>
        </div>
    );
};

export default Travel;