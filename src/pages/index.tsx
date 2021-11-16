/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
import { query as q } from 'faunadb'
import Head from 'next/head';
import { useContext } from 'react';
import { Context } from '../ModalProvider';

import styles from './home.module.scss'
import { GetStaticProps } from 'next';
import { fauna } from '../services/fauna';



export default function Home(isActiveButtomArray) {
    let isActive = []
    for (let i = 0; i < isActiveButtomArray.data.length; i++) {
        console.log(isActiveButtomArray.data[i].data.indice)
        isActive = [...isActive, isActiveButtomArray.data[i].data.indice]
    }

    const dataContext = useContext(Context);
    let array = []

    for (let i = 1; i <= 80; i++) {
        array[i] = i;
    }
    const indice = dataContext.indice

    function twoFunction(i) {
        if (isActive.indexOf(i) !== -1) {
            return alert('Oi, escolha outro Numero, esse ja é de alguém 😊😊')
        }
        dataContext.handleOpenModal()
        dataContext.handleSetIndice(i)
    }



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
                                console.log(isActive);


                                return (
                                    < button
                                        key={arr}
                                        value={arr}
                                        className={

                                            isActive.indexOf(i) !== -1 ? styles.isActive : ''
                                        } onClick={() => twoFunction(i)} > {arr}</button>
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



export const getStaticProps: GetStaticProps = async () => {

    async function aux(i: number) {
        const response = await fauna.query(

            q.Map(
                q.Paginate(q.Documents(q.Collection('cadastro_pessoa'))),
                q.Lambda(x => q.Get(x))
            )

        ).then((ret) => ret)
            .catch(() => false)

        return response
    }
    const response = await aux(1)

    // console.log(response.data);

    const isActiveButtomArray = await JSON.parse(JSON.stringify(response));

    return {
        props:
            isActiveButtomArray,

        revalidate: 5,//24 hours
    }
}