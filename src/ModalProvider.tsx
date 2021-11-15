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
    setIsActiveButton: (boolean: boolean) => void;
    isActivebutton: boolean;
}

export const Context = createContext({} as createContextProps);

export function ModalProvider({ children }: ModalProviderProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [indice, setIndice] = useState(0);
    const [isActivebutton, setIsActiveButton] = useState(false);

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
    }

    function handleSetIndice(i) {
        setIndice(i)
    }

    return (
        <Context.Provider value={{
            isOpen,
            handleOpenModal,
            handleCloseModal,
            handleSetIndice,
            indice,
            setIsActiveButton,
            isActivebutton
        }} >
            {children}
        </Context.Provider >
    )
}