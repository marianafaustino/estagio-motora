import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import FloatButton from './FloatButton';
import ModalAdd from './ModalAdd';

const Driver = () => {
    const [drivers, setdrivers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDriver, setselectedDriver] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        cnh: '',
        status: ''
    });

    useEffect(() => {
        const fetchdrivers = async () => {
            try {
                const response = await fetch('http://localhost:3000/drivers'); 
                const data = await response.json();
                setdrivers(data);
            } catch (error) {
                console.error('Erro ao buscar dados dos motoristas:', error);
            }
        };

        fetchdrivers();
    }, []);

    
    const handleAddDriver = async (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        const newDriver = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/drivers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDriver),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar motorista');
            }

            const addedDriver = await response.json();
            setdrivers((prevdrivers) => [...prevdrivers, addedDriver]); 
            setFormData({ name: '', cpf: '', cnh: '', status: '' });
            setIsModalOpen(false); 
        } catch (error) {
            console.error('Erro ao adicionar motorista:', error);
        }
    };

    const handleEditDriver = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const updatedData = Object.fromEntries(formData.entries());

        const updatedDriver = { ...selectedDriver, ...updatedData };

        try {
            const response = await fetch(`http://localhost:3000/drivers/${selectedDriver.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDriver),
            });

            if (!response.ok) {
                throw new Error('Erro ao editar motorista');
            }

            const newdrivers = drivers.map(drive =>
                drive.id === selectedDriver.id ? updatedDriver : drive
            );
            setdrivers(newdrivers);
            setFormData({ name: '', cpf: '', cnh: '', status: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao editar motorista:', error);
        }
    };

    const handleDeletedrive = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/drivers/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir motorista');
            }

            setdrivers((prevdrivers) => prevdrivers.filter(drive => drive.id !== id));
        } catch (error) {
            console.error('Erro ao excluir motorista:', error);
        }
    };

    const openEditModal = (drive) => {
        setselectedDriver(drive);
        setIsModalOpen(true);
    };

    return (
        <div className="recpfive overflow-x-auto" style={{height: "70vh"}}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Nome</th>
                        <th scope="col" className="px-6 py-3">CPF</th>
                        <th scope="col" className="px-6 py-3">CNH</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3"></th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((drive, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{drive.name}</td>
                            <td className="px-6 py-4">{drive.cpf}</td>
                            <td className="px-6 py-4">{drive.cnh}</td>
                            <td className="px-6 py-4">{drive.status === 'idle' ? 'PARADO' : drive.status === 'driving' ? 'DIRIGINDO' : drive.status}</td>
                            <td className="px-6 py-4"><button>{<PencilSquareIcon className='text-gray h-6 w-6' onClick={() => openEditModal(drive)}/>}</button></td>
                            <td className="px-6 py-4"><button>{<TrashIcon className='text-gray h-6 w-6' onClick={() => handleDeletedrive(drive.id)}/>}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer>
                <FloatButton disabled={false} onClick={() => setIsModalOpen(true)}/>
            </Footer>
            <ModalAdd isOpen={isModalOpen} onClose={() => {
                setIsModalOpen(false)
                setFormData({ name: '', type: '', cpf: '', cnh: '', speed: '', status: '' })
                setselectedDriver(null)}}>
                <h2 className="text-lg font-bold mb-4 text-motoraDarkBlue">
                    {selectedDriver ? 'Editar Motorista' : 'Adicionar Novo Motorista'}
                </h2>
                <form onSubmit={selectedDriver ? handleEditDriver : handleAddDriver}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-motoraDarkBlue">Nome</label>
                        <input type="text" id="name" name="name" required defaultValue={selectedDriver?.name || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                        
                        <label htmlFor="cpf" className="block text-sm font-medium text-motoraDarkBlue">CPF</label>
                        <input type="text" id="cpf" name="cpf" defaultValue={selectedDriver?.cpf || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    
                        <label htmlFor="cnh" className="block text-sm font-medium text-motoraDarkBlue">CNH</label>
                        <input type="number" id="cnh" name="cnh" defaultValue={selectedDriver?.cnh || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    
                        <label htmlFor="status" className="block text-sm font-medium text-motoraDarkBlue">Status</label>
                        <input type="text" id="status" name="status" defaultValue={selectedDriver?.status || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"/>
                    </div>
                    <button type="submit" className="mt-2 w-full bg-motoraDarkBlue text-white rounded-md p-2 hover:bg-motoraLightBlue">
                        {selectedDriver ? 'Salvar Alterações' : 'Adicionar'}
                    </button>
                </form>
            </ModalAdd>
        </div>
    );
};

export default Driver;