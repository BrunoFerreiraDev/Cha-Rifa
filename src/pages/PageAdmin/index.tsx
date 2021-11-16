/* eslint-disable @next/next/no-img-element */
import { query as q } from 'faunadb'
import React, { useEffect } from 'react';

import { GetStaticProps } from 'next';
import { fauna } from '../../services/fauna';
import styles from './styles.module.scss'
import { api } from '../../services/api';
import { useRouter } from 'next/dist/client/router';



export default function Home(isActiveButtomArray) {
    const data = isActiveButtomArray.data
    // const ref = data[0].ref['@ref']
    // console.log(ref.id);
    const history = useRouter()


    async function handleDeleteCadastro(ref) {
        if (window.confirm('Tem certeza que você deseja excluir esta pessoa?')) {
            await api.post("/deletar", { ref });
        }
        return history.reload()
    }

    return (
        <>
            <div className={styles.content}>
                <button className={styles.voltar} onClick={() => history.push('/')}>Voltar</button>
                {
                    data.map(data => {
                        return <div key={data.data.indice} >
                            <span>Nome: {data.data.nome}</span>
                            <span>Celular: {data.data.numero}</span>
                            <span>{data.data.indice}</span>
                            <button className={styles.deletar} onClick={
                                () => handleDeleteCadastro(data.ref['@ref'].id)}>
                                <img src="/images/RecycleBin.png" alt="RecycleBin" />
                            </button>
                        </div>
                    })
                }
            </div>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {

    async function getListIndice() {
        const response = await fauna.query(

            q.Map(
                q.Paginate(q.Documents(q.Collection('cadastro_pessoa'))),
                q.Lambda(x => q.Get(x))
            )

        ).then((ret) => ret)
            .catch(() => false)

        return response
    }
    const response = await getListIndice()
    const isActiveButtomArray = await JSON.parse(JSON.stringify(response));

    return {
        props:
            isActiveButtomArray,

        revalidate: 30,//segundos
    }
}