import { Disclosure} from '@headlessui/react'
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import socketTravels from '../websocket/socketTravels';
import socketVehicles from '../websocket/socketVehicles';
import { useState, useEffect } from 'react';
import ModalAdd from './ModalAdd';

const navigation = [
  { name: 'Veículos', href: '/'},
  { name: 'Motoristas', href: '/motoristas'},
  { name: 'Viagens', href: '/viagens' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [travels, setTravels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const location = useLocation();
  const [notification, setNotification] = useState([])

  useEffect(() => {
    socketTravels.on('travel-created', (data) => {
        data.message = `A viagem ${data.data.id} foi criada.`
        setNotification(prevNotifications => [...prevNotifications, data]);
        console.log('Viagem criada:', data);
        setTravels((prevTravels) => [...prevTravels, data]); 
    });

    socketTravels.on('travel-updated', (data) => {
      data.message = `A viagem ${data.data.id} foi atualizada.`
      setNotification(prevNotifications => [...prevNotifications, data]);
        console.log('Viagem atualizada:', data);
        setTravels((prevTravels) => [...prevTravels, data]); 
    });

    socketTravels.on('travel-deleted', (data) => {
      data.message = `A viagem ${data.data.id} foi excluída.`
      setNotification(prevNotifications => [...prevNotifications, data]);
        console.log('Viagem deletada:', data);
        setTravels((prevTravels) => [...prevTravels, data]); 
    });

    socketVehicles.on('vehicle-created', (data) => {
      data.message = `O veículo ${data.data.id} foi criado.`
      setNotification(prevNotifications => [...prevNotifications, data]);
      console.log('Veículo criado:', data);
  });

  socketVehicles.on('vehicle-updated', (data) => {
    data.message = `O veículo ${data.data.id} foi atualizado.`
    setNotification(prevNotifications => [...prevNotifications, data]);
      console.log('Veículo atualizado:', data);
      setTravels((prevTravels) => [...prevTravels, data]); 
  });

  socketVehicles.on('vehicle-deleted', (data) => {
    data.message = `O veículo ${data.data.id} foi excluído.`
    setNotification(prevNotifications => [...prevNotifications, data]);
      console.log('Veículo excluído:', data);
  });

    return () => {
        socketTravels.off('travel-created');
        socketTravels.off('travel-updated');
        socketTravels.off('travel-deleted');
        socketVehicles.off('vehicle-created');
        socketVehicles.off('vehicle-updated');
        socketVehicles.off('vehicle-deleted');
    };
}, []); 

console.log(notification)
  return (
    <>
    <Disclosure as="nav" className="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://media.licdn.com/dms/image/v2/C4E0BAQFX20GP9bryWw/company-logo_200_200/company-logo_200_200/0/1630579598280/motora_technologies_logo?e=1741824000&v=beta&t=fTETjUTy0He0m9JcaUeBFDKJvis4JqiqcgwC0bWmIIg"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={location.pathname === item.href ? 'page' : undefined}
                    className={classNames(
                      location.pathname === item.href ? 'bg-motoraDarkBlue text-white' : 'text-motoraDarkBlue hover:bg-motoraLightBlue hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
              type="button" onClick={openModal}>
                <BellAlertIcon className="h-6 w-6 text-motoraDarkBlue" />
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>

    <ModalAdd isOpen={isModalOpen} onClose={closeModal}>
                <h2 className="text-lg font-semibold">Notificações</h2>
                <div>
                    {notification.length === 0 ? (
                        <p>Nenhuma notificação.</p>
                    ) : (
                        notification.map((notification, index) => (
                            <div key={index} className="border-b py-2 text-motoraDarkBlue">
                                {notification.message}
                            </div>
                        ))
                    )}
                </div>
            </ModalAdd>
    </>
  )
}
