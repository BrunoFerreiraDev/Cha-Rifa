import { useState } from 'react';
import Modal from 'react-modal'



export function ModalCadastrar() {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpenModal() {
        setIsOpen(true)
    }

    function handleCloseModal() {
        setIsOpen(false)
    }


    return (
        <Modal
            isOpen={handleOpenModal}
            onRequestClose={handleCloseModal}//fecha o modal setando o estado para false
            overlayClassName="react-modal-overlay" //cria uma class para a parte de fora do modal
            className="react-modal-content" //cria uma class para o modal
        >
            <button
                type="button"
                onClick={handleCloseModal}
                className="react-modal-close"
            >
                <strong>Fechar</strong>
            </button>
        </Modal>
    )
}