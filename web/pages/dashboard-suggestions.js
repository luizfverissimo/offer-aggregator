import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import DashboardMenu from '../components/DashboardMenu';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';

import styles from '../styles/dashboard-suggestions.module.css';
import ActionButtons from '../components/ActionButtons';
import api from '../services/api';
import NProgress from 'nprogress';


function DashboardSuggestions() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteSuggestionId, setDeleteSuggestionId] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showNextButton, setShowNextButton] = useState(true)
  const [showPrevButton, setShowPrevButton] = useState(false)
  const [initialSuggestionId, setInitialSuggestionId] = useState(0)

  const fetchSuggestions = async () => {
    const rows = 10
    const res = await api.get(`/suggestions/index-suggestions?rows=${rows}`);
    const suggestionsRes = await res.data;
    setSuggestions(suggestionsRes)
    setShowPrevButton(false)
    if (suggestionsRes.length < 10) {
      setShowNextButton(false)
    }
    setInitialSuggestionId(suggestionsRes[0].id)
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

  const handlePagination = async (direction) => {
    NProgress.start();
    let suggestionsRes

    if(direction === 'next') {
      const index = suggestions.length - 1;
      const rows = 10
      const res = await api.get(
        `/suggestions/index-suggestions?cursor=${suggestions[index].id}&rows=${rows}`
      );
      suggestionsRes = await res.data;

      setShowPrevButton(true)

      if (suggestionsRes.length < 10) {
        setShowNextButton(false)
      }
    }

    if (direction === 'prev') {
      const rows = -10
      const res = await api.get(
        `/suggestions/index-suggestions?cursor=${suggestions[0].id}&rows=${rows}`
      );
      suggestionsRes = await res.data;

      if (suggestionsRes.length === 10 ) {
        setShowNextButton(true)
      }

      if (suggestionsRes[0].id === initialSuggestionId) {
        setShowPrevButton(false)
      }
    }

    setSuggestions(suggestionsRes)
    NProgress.done();
    return;
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

export default DashboardSuggestions;
