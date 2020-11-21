import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';

import DashboardMenu from '../components/DashboardMenu';
import Modal from '../components/Modal';

import styles from '../styles/dashboard-suggestions.module.css';
import ActionButtons from '../components/ActionButtons';
import api from '../services/api';


function DashboardAffiliates() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteAffiliateId, setDeleteAffiliateId] = useState('');
  const [affiliates, setAffiliates] = useState([])
  
  const router = useRouter();

  const fetchAffiliates = async () => {
    const res = await api.get(`/affiliates/index-affiliates`);
    const affiliatesRes = await res.data;
    setAffiliates(affiliatesRes)
    return ;
  };

  useEffect(() => {
    fetchAffiliates()
  }, []);

  const handleDeleteOffer = async () => {
    const res = await api.delete(`/affiliates/delete-affiliate?id=${deleteAffiliateId}`);
    setDeleteAffiliateId('');
    setIsOpen(false);
    fetchAffiliates();
  };

  return (
    <>
      <Head>
        <title>Sugestões de Ofertas - Super Oferta do Dia</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      {isOpen && (
        <Modal onClickCloseModal={() => setIsOpen(false)}>
          <h2>Deseja excluir a sugestão?</h2>
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
          <h1>Gerenciamento de Links de Afiliados</h1>
          <button
            type='button'
            className={styles.newOfferButton}
            onClick={() => router.push('/create-affiliate')}
          >
          NOVO LINK
          </button>

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th style={{ width: 50 }}>id</th>
                <th>Afiliado</th>
                <th>Link</th>
                <th style={{ width: 150 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {affiliates.map((affiliate) => {
                return (
                  <tr key={affiliate.id} className={styles.tableData}>
                    <td style={{ width: 50, textAlign: "center" }}>{affiliate.id}</td>
                    <td style={{ width: 200 }}>{affiliate.store}</td>
                    <td style={{ width: 200 }}>{affiliate.affiliateLink}</td>
                    <td className={styles.actionContainer}>
                      <ActionButtons
                        affiliate
                        onClickEdit={() => {}}
                        onClickDelete={() => {
                          setIsOpen(true);
                          setDeleteAffiliateId(affiliate.id);
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

export default DashboardAffiliates;
