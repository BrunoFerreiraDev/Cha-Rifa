/* eslint-disable @next/next/no-img-element */
import { query as q } from "faunadb";
import Head from "next/head";
import React, { useContext } from "react";
import { Context } from "../ModalProvider";

import styles from "./home.module.scss";
import { GetStaticProps } from "next";
import { fauna } from "../services/fauna";
import { api } from "../services/api";
import { useRouter } from "next/dist/client/router";

export default function Home(isActiveButtomArray) {
  const history = useRouter();
  const dataContext = useContext(Context);
  console.log({ isActiveButtomArray });

  let isActive = [];
  for (let i = 0; i < isActiveButtomArray.data.length; i++) {
    isActive = [...isActive, isActiveButtomArray.data[i].data.indice];
  }

  let array = [];

  for (let i = 1; i <= 300; i++) {
    array[i] = i;
  }

  function executeTwoFunction(i) {
    if (isActive.indexOf(i) !== -1) {
      const found = isActiveButtomArray.data.find(
        (item) => item.data.indice === i
      );
      if (found) return alert(`Esse numero ja pertence a ${found.data.nome}`);
    }
    dataContext.handleOpenModal();
    dataContext.handleSetIndice(i);
  }
  async function handleLoginAdm() {
    let login = prompt("digite  o login:");
    let senha = prompt("digite a senha:");

    const response = await api.post("/auth", { login, senha });
    const data = await response.data;
    if (data) {
      history.push("/PageAdmin");
    } else {
      if (senha) alert("senha ou login errado");
    }
  }

  return (
    <>
      <Head>
        <title>Sorteios</title>
      </Head>
      <main className={styles.content}>
        <button onClick={handleLoginAdm} className={styles.buttonBear}>
          <img src="/iconBearFavicon.png" alt="iconBearFavicon" />
        </button>
        <h1>Sorteio da Comunidade Nova</h1>
        <h3>Kit O Boticário Homen</h3>
        <div className={styles.container}>
          <div className={styles.gridNumbers} id="navGridNumbers">
            {array.map((arr, i) => {
              return (
                <button
                  key={arr}
                  className={isActive.indexOf(i) !== -1 ? styles.isActive : ""}
                  onClick={() => executeTwoFunction(i)}
                >
                  {" "}
                  {arr}
                </button>
              );
            })}
          </div>
          {/* <div className={styles.info}>
            <p>
              <span>Nº 01 AO 30 = FRALDAS P</span>
              <span>Nº 31 AO 60 = FRALDAS M</span>
              <span>Nº 61 AO 80 = FRALDAS G</span>
            </p>
            <span>🎊🎉BOA SORTE!🎉🎊</span>
          </div> */}
        </div>
        <div style={{ paddingBottom: "1rem" }}></div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  async function getListIndice() {
    const response = await fauna
      .query(
        q.Map(
          q.Paginate(q.Documents(q.Collection("cadastro_pessoa"))),
          q.Lambda((x) => q.Get(x))
        )
      )
      .then((ret) => ret)
      .catch(() => false);

    return response;
  }
  const response = await getListIndice();
  const isActiveButtomArray = await JSON.parse(JSON.stringify(response));

  return {
    props: isActiveButtomArray,

    revalidate: 30, //segundos
  };
};
