import React, {createContext, ReactNode, useContext, useState} from 'react';

// Create the Modal context
interface ModalContextProps {
    dismiss: () => void;
    isModalOpen: boolean;
}

const ModalContent = createContext<ModalContextProps | undefined>(undefined);

// Custom hook to use the modal context
export const useModal = (): ModalContextProps => {
    const context = useContext(ModalContent);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

interface ModalProviderProps {
    children: ReactNode;
}

// Modal provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    // State to manage the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    // The dismiss function to close the modal
    const dismiss = () => {
        setIsModalOpen(false);
    };

    return (
        <ModalContent.Provider value={{dismiss, isModalOpen}}>
            {children}
        </ModalContent.Provider>
    );
};

export default ModalProvider;