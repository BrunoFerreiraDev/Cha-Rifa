/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { Context } from '../ModalProvider';

import styles from './home.module.scss'
import { GetStaticProps } from 'next';

export default function Home() {
    const dataContext = useContext(Context);
    let array = []

    for (let i = 1; i <= 80; i++) {
        array[i] = i;
    }
    const isActive = dataContext.isActivebutton
    const indice = dataContext.indice
    console.log(isActive);


    function twoFunction(i) {
        dataContext.handleOpenModal()
        dataContext.handleSetIndice(i)
    }
    // async function handlesIsActive() {
    //     useEffect(() => {
    //         const cons = api.post("/consultar", { indice });
    //         console.log('oi', cons.data);

    //     }, [])
    // }


    return (
        <>
            <Head>
                <title>Chá-Rifa</title>
            </Head>
            <main className={styles.content}>
                <div className={styles.container}>
                    <a id={styles.buttomNextPage} href="#navGridNumbers">
                        <img src="/images/EscolhaUmNumero.png" alt="EscolhaUmNumero" />
                    </a>
                    <div className={styles.gridNumbers} id="navGridNumbers">
                        {
                            array.map((arr, i) => {
                                // isActive(i)
                                return (

                                    < button key={arr} className={isActive && indice == i ? styles.isActive : ''} onClick={() => twoFunction(i)} > {arr}</button>
                                )
                            })
                        }
                    </div>
                    <div className={styles.info}>
                        <p>
                            <span>Nº 01 AO 30 = FRALDAS P</span>
                            <span>Nº 31 AO 60 = FRALDAS M</span>
                            <span>Nº 61 AO 80 = FRALDAS G</span>
                        </p>
                        <span>🎊🎉BOA SORTE!🎉🎊</span>
                    </div>
                </div>
            </main >
        </>
    )
}

// export const getStaticProps: GetStaticProps = async () => {
//     let aux = []
//     for (let i = 1; i <= 80; i++) {
//         const response = await api.post("/consultar", { i });
//         console.log(response.data);
//         aux[i] = i


//     }


//     return {
//         props: {
//             aux,
//         },
//         revalidate: 60 * 60 * 24,//24 hours
//     }
// }