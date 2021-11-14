/* eslint-disable @next/next/no-img-element */
import { useContext } from 'react'
import { Context } from '../Context';

import styles from './home.module.scss'

export default function Home() {
    const contesto = useContext(Context);
    let array = []
    for (let i = 1; i <= 80; i++) {
        array[i] = i;
    }

    return (
        <main className={styles.content}>
            <div className={styles.container}>
                <a id={styles.buttomNextPage} href="#navGridNumbers">
                    <img src="/images/EscolhaUmNumero.png" alt="EscolhaUmNumero" />
                </a>
                <div className={styles.gridNumbers} id="navGridNumbers">
                    {
                        array.map(arr => {
                            return (
                                < button key={arr}> {arr}</button>
                            )
                        })
                    }
                </div>
            </div>
        </main >
    )
}
