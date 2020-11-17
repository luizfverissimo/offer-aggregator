import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import DashboardMenu from '../components/DashboardMenu';
import Modal from '../components/Modal';

import styles from '../styles/dashboard-suggestions.module.css';
import ActionButtons from '../components/ActionButtons';
import api from '../services/api';

function DashboardSuggestions() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSuggestionId, setDeleteSuggestionId] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async () => {
    const res = await api.get('/suggestions/index-suggestions');
    const suggestionsRes = await res.data;
    setSuggestions(suggestionsRes)
    return ;
  };

  useEffect(() => {
    fetchSuggestions()
  }, []);

  const handleDeleteOffer = async () => {
    const res = await api.delete(`/suggestions/delete-suggestion?id=${deleteSuggestionId}`);
    setDeleteSuggestionId('');
    setIsOpen(false);
    fetchSuggestions();
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
          <h1>Sugestões de Ofertas</h1>

          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeader}>
                <th style={{ width: 50 }}>id</th>
                <th>Oferta</th>
                <th style={{ width: 150 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {suggestions.map((sug) => {
                return (
                  <tr key={sug.id} className={styles.tableData}>
                    <td style={{ width: 50, textAlign: "center" }}>{sug.id}</td>
                    <td style={{ width: 450 }}><a href={sug.offerLink} target="_blank">{sug.offerLink}</a></td>
                    <td className={styles.actionContainer}>
                      <ActionButtons
                        suggestion
                        href={sug.offerLink}
                        onClickDelete={() => {
                          setIsOpen(true);
                          setDeleteSuggestionId(sug.id);
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

export default DashboardSuggestions;
