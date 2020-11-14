import React from 'react';
import Head from 'next/head';

import DashboardMenu from '../components/DashboardMenu';

import styles from '../styles/dashboard.module.css';

function DashboardOffers() {
  return (
    <>
      <Head>
        <title>Super Oferta do Dia - ADMIN Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      <div className={styles.content}>
        <DashboardMenu />
        <div className={styles.offersContent}>
          <h1>Gerenciamento de Ofertas</h1>
        </div>
      </div>
    </>
  );
}

export default DashboardOffers;
