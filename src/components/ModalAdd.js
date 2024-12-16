import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

const ModalAdd = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg z-10 p-6 relative max-h-screen overflow-y-auto">
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <XMarkIcon className="h-5 w-5 text-motoraDarkBlue hover:text-motoraLightBlue"/>
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalAdd;

