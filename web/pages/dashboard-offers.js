import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import DashboardMenu from '../components/DashboardMenu';
import Modal from '../components/Modal';

import styles from '../styles/dashboard-offers.module.css';
import ActionButtons from '../components/ActionButtons';
import api from '../services/api';

function DashboardOffers() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOfferId, setDeleteOfferId] = useState('');
  const [offers, setOffers] = useState([]);

  const fetchOffers = async () => {
    const res = await api.get('/offers/index-offers');
    const offersRes = await res.data;
    setOffers(offersRes);
    return;
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleActivityToggle = async (id) => {
    const res = await api.put(`/offers/toggle-offer?id=${id}`);
    fetchOffers();
  };

  const handleDeleteOffer = async () => {
    const res = await api.delete(`/offers/delete-offer?id=${deleteOfferId}`);
    setDeleteOfferId('');
    setIsOpen(false);
    fetchOffers();
  };

  return (
    <>
      <Head>
        <title>Super Oferta do Dia - ADMIN Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      {isOpen && (
        <Modal onClickCloseModal={() => setIsOpen(false)}>
          <h2>Deseja excluir a oferta?</h2>
          <div className={styles.modalButtonContainer}>
            <button type='button' onClick={handleDeleteOffer}>
              SIM
            </button>
            <button type='button' onClick={() => setIsOpen(false)}>
              NÃO
            </button>
          </div>
        </Modal>
      )}

      <div className={styles.content}>
        <DashboardMenu />
        <div className={styles.offersContent}>
          <h1>Gerenciamento de Ofertas</h1>
          <button type='button' className={styles.newOfferButton}>
            NOVA OFERTA
          </button>

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th style={{ width: 50 }}>id</th>
                <th style={{ width: 450 }}>Produto</th>
                <th style={{ width: 150 }}>Loja</th>
                <th style={{ width: 150 }}>Status</th>
                <th style={{ width: 150 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => {
                return (
                  <tr key={offer.id} className={styles.tableData}>
                    <td style={{ width: 50, textAlign: 'center' }}>
                      {offer.id}
                    </td>
                    <td style={{ width: 450 }}>{offer.name}</td>
                    <td style={{ width: 150 }}>{offer.store}</td>
                    <td
                      style={{ width: 150 }}
                      className={offer.active ? styles.active : styles.inactive}
                    >
                      {offer.active ? 'Ativa' : 'Inativa'}
                    </td>
                    <td className={styles.actionContainer}>
                      <ActionButtons
                        isActive={offer.active}
                        href={offer.urlOffer}
                        onClickActivity={() => handleActivityToggle(offer.id)}
                        onClickDelete={() => {
                          setIsOpen(true);
                          setDeleteOfferId(offer.id);
                        }}
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
