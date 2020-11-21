import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Dashboard from '../components/DashboardMenu';
import api from '../services/api';


import styles from '../styles/create-affiliate.module.scss';

function CreateAffiliate() {
  const [affiliateId, setAffiliateId] = useState(0)
  const [store, setStore] = useState('')
  const [affiliateLink, setAffiliateLink] = useState('')

  const router = useRouter();

  const fetchAffiliate = async (id) => {
    const res = await api.get(`/affiliates/affiliate?id=${id}`);
    const affiliate = await res.data;

    setAffiliateId(affiliate.id)
    setStore(affiliate.store)
    setAffiliateLink(affiliate.affiliateLink)
    return;
  };

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      fetchAffiliate(id)
    }
  }, []);

  const handleCreateOffer = async () => {
    if (
      affiliateLink.length === 0 ||
      store.length === 0
    ) {
      alert('Você precisa preencher todos os campos!');
      return;
    }

    const storeUppercase = store.toUpperCase();  

    if (affiliateId) {
      const res = await api.put('/affiliates/update-affiliate', {
        id: affiliateId,
        store: storeUppercase,
        affiliateLink
      });

      alert('Afiliado atualizado com sucesso!');
      router.back();
      return;
    }

    const res = await api.post('/affiliates/create-affiliate', {
      store: storeUppercase,
      affiliateLink
    });

    alert('Afiliado criado com sucesso!');
    router.back();
  };

  return (
    <>
      <Head>
        <title>Super Oferta do Dia - ADMIN Dashboard</title>
        <link rel='icon' href='/favicon.ico' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
      </Head>

      <div className={styles.content}>
        <Dashboard />
        <div className={styles.createOfferContent}>
          <div className={styles.headerContainer}>
            <h1>Novo Afiliado</h1>
            <button
              type='button'
              className={styles.newOfferButton}
              onClick={handleCreateOffer}
            >
              SALVAR
            </button>
          </div>

          <form>
            <p>*Todos os campos são obrigatórios</p>
            <div className={styles.oneColumn}>
              <label>Nome do Afiliado</label>
              <input
                type='text'
                value={store}
                onChange={(e) => setStore(e.target.value)}
              />

              <label>Link do afiliado</label>
              <input
                type='text'
                value={affiliateLink}
                onChange={(e) => setAffiliateLink(e.target.value)}
              />
              <p>Este é o link que irá após o link da oferta.</p>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default CreateAffiliate;
