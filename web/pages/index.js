import Head from 'next/head';
import Link from 'next/link';

import Card from '../components/OfferCard.js';

import styles from '../styles/landing-page.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Super Oferta do Dia - Encontre a melhor oferta e economize muito
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <img
              src={require('../public/logo.svg')}
              alt='Super Oferta do Dia - Logo'
            />

            <input type='text' placeholder='🔎 Pesquise por um produto' />

            <Link href='/'>
              <a className={styles.enviarPromo}>Enviar promoção</a>
            </Link>
          </div>
        </div>

        <section className={styles.pageContent}>
          <Card />
        </section>
      </main>
    </>
  );
}
