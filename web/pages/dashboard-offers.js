import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

import DashboardMenu from '../components/DashboardMenu';
import Modal from '../components/Modal';

import styles from '../styles/dashboard-offers.module.css';
import ActionButtons from '../components/ActionButtons';
import api from '../services/api';
import Pagination from '../components/Pagination';

function DashboardOffers() {
  const [initialOffersId, setInitialOffersId] = useState(0)
  const [isOpen, setIsOpen] = useState(false);
  const [deleteOfferId, setDeleteOfferId] = useState('');
  const [offers, setOffers] = useState([]);
  const [showNextButton, setShowNextButton] = useState(true)
  const [showPrevButton, setShowPrevButton] = useState(false)

  const router = useRouter();

  const fetchOffers = async () => {
    const res = await api.get(`api/offers/index-offers?rows=${10}`);
    const offersRes = await res.data;
    setShowPrevButton(false)
    if (offersRes.length < 10) {
      setShowNextButton(false)
    }
    setOffers(offersRes);
    setInitialOffersId(offersRes[0].id)
    return;
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleActivityToggle = async (id) => {
    const res = await api.put(`api/offers/toggle-offer?id=${id}`);
    fetchOffers();
  };

  const handleDeleteOffer = async () => {
    const res = await api.delete(`api/offers/delete-offer?id=${deleteOfferId}`);
    setDeleteOfferId('');
    setIsOpen(false);
    fetchOffers();
  };

  const handlePagination = async (direction) => {
    NProgress.start();
    let offersRes

    if(direction === 'next') {
      const index = offers.length - 1;
      const rows = 10
      const res = await api.get(
        `api/offers/index-offers?cursor=${offers[index].id}&rows=${rows}`
      );
      offersRes = await res.data;

      setShowPrevButton(true)

      if (offersRes.length < 10) {
        setShowNextButton(false)
      }
    }

    if (direction === 'prev') {
      const rows = -10
      const res = await api.get(
        `api/offers/index-offers?cursor=${offers[0].id}&rows=${rows}`
      );
      offersRes = await res.data;

      if (offersRes.length === 10 ) {
        setShowNextButton(true)
      }

      if (offersRes[0].id === initialOffersId) {
        setShowPrevButton(false)
      }
    }

    setOffers(offersRes);
    NProgress.done();
    return;
  };

  return (
    <>
      <Head>
        <title>Offers Management - Super Oferta do Dia</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      {isOpen && (
        <Modal onClickCloseModal={() => setIsOpen(false)}>
          <h2>Delete this offer?</h2>
          <div className={styles.modalButtonContainer}>
            <button type='button' onClick={handleDeleteOffer}>
              YES
            </button>
            <button type='button' onClick={() => setIsOpen(false)}>
              NO
            </button>
          </div>
        </Modal>
      )}

      <div className={styles.content}>
        <DashboardMenu />
        <div className={styles.offersContent}>
          <h1>Offers Management</h1>
          <button
            type='button'
            className={styles.newOfferButton}
            onClick={() => router.push('/create-offer')}
          >
            NEW OFFER
          </button>

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th style={{ width: 50 }}>id</th>
                <th style={{ width: 450 }}>Product</th>
                <th style={{ width: 150 }}>Store</th>
                <th style={{ width: 150 }}>Status</th>
                <th style={{ width: 150 }}>Actions</th>
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
                      {offer.active ? 'Active' : 'Inactive'}
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
                        onClickEdit={() =>
                          router.push({
                            pathname: '/create-offer',
                            query: {
                              id: offer.id
                            }
                          })
                        }
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            showNextButton={showNextButton}
            showPrevButton={showPrevButton}
            onClickNext={() => handlePagination('next')}
            onClickPrev={() => handlePagination('prev')}
          />
        </div>
      </div>
    </>
  );
}

export default DashboardOffers;
