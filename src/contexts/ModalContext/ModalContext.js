import React, { createContext, useContext, useState } from 'react';
import propTypes from 'prop-types';

const ModalContent = createContext();
export const useModal = () => useContext(ModalContent);

// Create the provider component
const ModalProvider = ({ children }) => {
    // State to manage the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(true);

    // The dismiss function to close the modal
    const dismiss = () => {
        setIsModalOpen(false);
    };

    return (
        <ModalContent.Provider value={{ dismiss, isModalOpen }}>
            {children}
        </ModalContent.Provider>
    );
};

// Prop types
ModalProvider.propTypes = {
    children: propTypes.node.isRequired,
};

export default ModalProvider;