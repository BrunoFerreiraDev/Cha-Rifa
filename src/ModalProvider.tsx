import { createContext, ReactNode, useState } from "react";


interface ModalProviderProps {
    children: ReactNode
}

interface createContextProps {
    isOpen: boolean;
    handleOpenModal: () => void;
    handleCloseModal: () => void;
    handleSetIndice: (param: number) => void;
    indice: number;
    handleSetIndiceArray;
    indiceArray;
}

export const Context = createContext({} as createContextProps);

export function ModalProvider({ children }: ModalProviderProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [indice, setIndice] = useState(0);
    const [indiceArray, setIndiceArray] = useState([]);

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
    }

    function handleSetIndice(i) {
        setIndice(i)
    }

    function handleSetIndiceArray(array) {
        setIndiceArray([...array])
    }

    return (
        <Context.Provider value={{
            isOpen,
            handleOpenModal,
            handleCloseModal,
            handleSetIndice,
            indice,
            handleSetIndiceArray,
            indiceArray,
        }} >
            {children}
        </Context.Provider >
    )
}