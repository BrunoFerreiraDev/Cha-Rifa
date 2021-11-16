/* eslint-disable @next/next/no-img-element */
import { FormEvent, useContext, useState } from 'react';
import { Context } from '../../ModalProvider';
import Modal from 'react-modal'

import styles from './modalCadastrar.module.scss'
import { api } from '../../services/api';

export function ModalCadastrar() {
    const dataContext = useContext(Context);

    const [numero, setNumero] = useState('');
    const [nome, setNome] = useState('');
    const indice = dataContext.indice

    async function handleCreateCadastro(event: FormEvent) {
        event.preventDefault();
        const response = await api.post("/cadastrar", { numero, nome, indice });

        setNome('')
        setNumero('')

        dataContext.setIsActiveButton(true);
        dataContext.handleCloseModal()
    }

    return (
        <Modal
            isOpen={dataContext.isOpen}
            onRequestClose={dataContext.handleCloseModal}//fecha o modal setando o estado para false
            overlayClassName="react-modal-overlay" //cria uma class para a parte de fora do modal
            className={styles.content} //cria uma class para o modal
        >
            <button
                type="button"
                onClick={dataContext.handleCloseModal}
                className={styles.modalClose}
            >
                <img src="/images/close.svg" alt="Fechar modal" />
            </button>

            <h2>Escolher numero da Rifa</h2>
            <form onSubmit={handleCreateCadastro}>
                <input
                    placeholder="Nome Completo"
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                />

                <input
                    type="string"
                    placeholder="Numero do Celular"
                    value={numero}
                    onChange={event => setNumero(event.target.value)}
                />
                <button id={styles.cadastrar} type="submit">
                    Cadastrar
                </button>
            </form>
        </Modal>
    )
}