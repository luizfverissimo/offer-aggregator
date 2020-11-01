import Head from 'next/head';
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
          <div className={styles.content}>
            <img
              src={require('../public/logo.svg')}
              alt='Super Oferta do Dia - Logo'
            />

            <input type='text' placeholder='🔎 Pesquise por um produto' />

            <div className={styles.enviarPromo}>Enviar promoção</div>
          </div>
        </div>
      </main>
    </>
  );
}
