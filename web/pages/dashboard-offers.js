import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import DashboardMenu from '../components/DashboardMenu';

import styles from '../styles/dashboard-offers.module.css';
import ActionButtons from '../components/ActionButtons';
import api from '../services/api';

function DashboardOffers() {
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    const res = await api.get('/offers/index-offers');
    const offersRes = await res.data;
    setOffers(offersRes)
    return ;
  };

  useEffect(() => {
    fetchOffers()
  }, [offers]);

  const handleActivity = async (id) => {
    const res = await api.put(`/offers/toggle-offer?id=${id}`);
    console.log(res);
    const offerArr = offers
    const offerIndex = offers.findIndex(offer => offer.id === id)
    offerArr[offerIndex].active = !offerArr[offerIndex].active

    setOffers(offerArr)
  };

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

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th>id</th>
                <th>Produto</th>
                <th>Loja</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => {
                return (
                  <tr key={offer.id} className={styles.tableData}>
                    <td style={{ width: 50 }}>{offer.id}</td>
                    <td style={{ width: 450 }}>{offer.name}</td>
                    <td style={{ width: 150 }}>{offer.store}</td>
                    <td
                      style={{ width: 150 }}
                      className={offer.active ? styles.active : styles.inactive}
                    >
                      {offer.active ? 'Ativa' : 'Inativa'}
                    </td>
                    <td style={{ width: 200}} className={styles.actionContainer}>
                      <ActionButtons
                        isActive={offer.active}
                        onClickActivity={() => handleActivity(offer.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DashboardOffers;
